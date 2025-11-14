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
exports.getSale = void 0;
const database_1 = require("../../../database");
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../../../utils");
const schema_1 = require("./schema");
const date_1 = require("../../../utils/date");
const getSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const result = schema_1.SaleSchema.safeParse(req.params);
    if (result.error) {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json(utils_1.Status.error("SALE1001", `Parâmetro inválido:`, result.error.format()));
    }
    try {
        const venda = yield (0, database_1.db)("vendas")
            .select("valor_total", "valor_pago", "troco", "data_venda")
            .where("id", (_a = result.data) === null || _a === void 0 ? void 0 : _a.id)
            .first();
        if (!venda) {
            res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json(utils_1.Status.error("SALE2002", "Venda não encontrada."));
        }
        const produtos = yield (0, database_1.db)("produtosvendas as pv")
            .join("produtos as p", "pv.id_produto", "p.id")
            .join("medidas as m", "pv.id_medida", "m.id")
            .select("p.nome", "m.sigla", "pv.quantidade", "pv.preco_unidade")
            .where("pv.id_venda", (_b = result.data) === null || _b === void 0 ? void 0 : _b.id);
        const formatValues = (value, decimal) => {
            return Number(value).toFixed(decimal).replace(".", ",");
        };
        res.status(http_status_codes_1.StatusCodes.OK).json({
            data: {
                id: result.data.id,
                troco: formatValues(venda.troco, 2),
                valor_total: formatValues(venda.valor_total, 2),
                valor_pago: formatValues(venda.valor_pago, 2),
                data_venda: (0, date_1.formateISODate)(venda.data_venda),
                produtos: produtos.map((product) => {
                    return Object.assign(Object.assign({}, product), { quantidade: formatValues(product.quantidade, 3), preco_unidade: formatValues(product.preco_unidade, 2) });
                }),
            },
        });
    }
    catch (err) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json(utils_1.Status.error("SALE2003", `Erro interno: ${err === null || err === void 0 ? void 0 : err.message}`));
    }
});
exports.getSale = getSale;
