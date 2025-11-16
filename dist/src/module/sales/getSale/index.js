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
const toISODate = (date) => {
    if (date) {
        const [day, month, year] = date.split("/");
        return `${year}-${month}-${day}`;
    }
};
const getSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const result = schema_1.SaleSchema.safeParse(req.query);
    if (!result.success) {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json(utils_1.Status.error("SALE1001", "Parâmetro inválido", result.error.format()));
    }
    try {
        let query = (0, database_1.db)("vendas").select("id", "valor_total", "valor_pago", "troco", "data_venda");
        if ((_a = result.data) === null || _a === void 0 ? void 0 : _a.id) {
            query = query.where("id", (_b = result.data) === null || _b === void 0 ? void 0 : _b.id);
        }
        else if (((_c = result.data) === null || _c === void 0 ? void 0 : _c.dataInicio) && ((_d = result.data) === null || _d === void 0 ? void 0 : _d.dataFim)) {
            query = query
                .whereRaw("DATE(data_venda) >= DATE(?)", [
                toISODate(result.data.dataInicio),
            ])
                .whereRaw("DATE(data_venda) <= DATE(?)", [
                toISODate(result.data.dataFim),
            ]);
        }
        else {
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json(utils_1.Status.error("SALE2002", "Parâmetros inválidos."));
        }
        const vendas = yield query;
        if (!vendas || vendas.length === 0) {
            res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json(utils_1.Status.error("SALE2003", "Nenhuma venda encontrada."));
        }
        const formatValues = (value, decimal) => {
            return Number(value).toFixed(decimal).replace(".", ",");
        };
        const response = yield Promise.all(vendas.map((venda) => __awaiter(void 0, void 0, void 0, function* () {
            const produtos = yield (0, database_1.db)("produtosvendas as pv")
                .join("produtos as p", "pv.id_produto", "p.id")
                .join("medidas as m", "pv.id_medida", "m.id")
                .select("p.nome", "m.sigla", "pv.quantidade", "pv.preco_unidade")
                .where("pv.id_venda", venda.id);
            return Object.assign(Object.assign({}, venda), { troco: formatValues(venda.troco, 2), valor_total: formatValues(venda.valor_total, 2), valor_pago: formatValues(venda.valor_pago, 2), data_venda: (0, date_1.formateISODate)(venda.data_venda), produtos: produtos.map((product) => {
                    return Object.assign(Object.assign({}, product), { preco_unidade: formatValues(product.preco_unidade, 2), quantidade: formatValues(product.quantidade, 3) });
                }) });
        })));
        res.status(http_status_codes_1.StatusCodes.OK).json({ data: response });
    }
    catch (err) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json(utils_1.Status.error("SALE2003", `Erro interno: ${err === null || err === void 0 ? void 0 : err.message}`));
    }
});
exports.getSale = getSale;
