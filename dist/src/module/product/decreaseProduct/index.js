"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decreaseProduct = void 0;
const database_1 = require("../../../database");
const status_1 = require("../../../utils/status");
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../../../utils");
const schema_1 = require("./schema");
const parseQty = (v) => {
    const n = typeof v === "number" ? v : parseFloat(String(v !== null && v !== void 0 ? v : "").trim());
    return Number.isFinite(n) ? n : NaN;
};
const decreaseProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = schema_1.DecreaseSchema.safeParse(req.body.produtos);
    if (result.error) {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json(utils_1.Status.error("PROD5001", `Parâmetro inválido:`, result.error.format()));
    }
    const produtos = result.data;
    const trx = yield database_1.db.transaction();
    try {
        // 🔍 Normaliza os códigos (string sem espaços)
        const codigosProdutos = produtos.map((p) => String(p.codigo).trim());
        // 🧠 Busca produtos existentes
        const currentStocks = yield trx("produtos")
            .whereIn("codigo", codigosProdutos)
            .select("codigo", "quantidade", "id");
        // 💡 Mapeia resultados encontrados
        const foundCodes = currentStocks.map((p) => String(p.codigo).trim());
        const notFound = codigosProdutos.filter((c) => !foundCodes.includes(c));
        if (notFound.length > 0) {
            yield trx.rollback();
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json((0, status_1.error)("PROD5002", `Alguns produtos não foram encontrados: ${notFound.join(", ")}`));
        }
        // ⚙️ Atualiza quantidades
        const updates = [];
        for (const produtoDb of currentStocks) {
            const reqProduto = produtos.find((p) => String(p.codigo).trim() === String(produtoDb.codigo).trim());
            if (!reqProduto)
                continue;
            const dbQty = parseQty(produtoDb.quantidade);
            const reqQty = parseQty(reqProduto.quantidade);
            if (!Number.isFinite(dbQty) || !Number.isFinite(reqQty)) {
                yield trx.rollback();
                res
                    .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                    .json((0, status_1.error)("PROD5006", `Quantidade inválida para ${produtoDb.codigo}`));
            }
            if (dbQty < reqQty) {
                yield trx.rollback();
                res
                    .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                    .json((0, status_1.error)("PROD5003", `Estoque insuficiente para o produto ${produtoDb.codigo}.`));
            }
            updates.push({
                codigo: produtoDb.codigo,
                quantidade: dbQty - reqQty,
            });
        }
        // 🔄 Executa updates no DB
        for (const u of updates) {
            yield trx("produtos")
                .where({ codigo: u.codigo })
                .update({ quantidade: u.quantidade });
        }
        yield trx.commit();
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ data: { message: "Baixas aplicadas com sucesso." } });
    }
    catch (err) {
        yield trx.rollback();
        console.error("Erro ao aplicar baixa:", err);
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json(utils_1.Status.error("ERRO_UPDATE", `Erro interno: ${err === null || err === void 0 ? void 0 : err.message}`));
    }
});
exports.decreaseProduct = decreaseProduct;
