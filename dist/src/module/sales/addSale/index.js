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
exports.addSale = void 0;
const database_1 = require("../../../database");
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../../../utils");
const schema_1 = require("./schema");
const generateOrderedUniqueNumericHash_1 = require("../../../utils/generateOrderedUniqueNumericHash");
const addSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const result = schema_1.SaleSchema.safeParse(req.body);
    if (result.error) {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json(utils_1.Status.error("SALE1001", `Parâmetro inválido:`, result.error.format()));
    }
    const trx = yield database_1.db.transaction();
    try {
        const saleId = (0, generateOrderedUniqueNumericHash_1.generateOrderedUniqueNumericHash)();
        yield trx("vendas").insert({
            id: saleId,
            valor_total: (_a = result.data) === null || _a === void 0 ? void 0 : _a.valor_total,
            valor_pago: (_b = result.data) === null || _b === void 0 ? void 0 : _b.valor_pago,
            troco: (_c = result.data) === null || _c === void 0 ? void 0 : _c.troco,
            data_venda: database_1.db.fn.now(),
        });
        const produtosVenda = (_d = result.data) === null || _d === void 0 ? void 0 : _d.produtos.map((produto) => ({
            id_venda: saleId,
            id_produto: produto.id_produto,
            id_medida: produto.id_medida,
            quantidade: produto.quantidade,
            preco_unidade: produto.preco_unidade,
        }));
        yield trx("produtosvendas").insert(produtosVenda);
        yield trx.commit();
        res.status(http_status_codes_1.StatusCodes.OK).json({
            data: { idVenda: saleId },
        });
    }
    catch (err) {
        yield trx.rollback();
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json(utils_1.Status.error("ERRO_UPDATE", `Erro interno: ${err === null || err === void 0 ? void 0 : err.message}`));
    }
});
exports.addSale = addSale;
