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
exports.getExpiringBatches = void 0;
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
const http_status_codes_1 = require("http-status-codes");
const database_1 = require("../../../database");
const utils_1 = require("../../../utils");
const getExpiringBatches = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date();
        const oneWeekLater = new Date();
        oneWeekLater.setDate(today.getDate() + 7);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const lotes = yield (0, database_1.db)("lotes")
            .select("lotes.codigo as lote_codigo", "lotes.dt_validade", "lotes.quantidade", "produtos.nome as produto_nome", "medidas.sigla as medida_sigla")
            .leftJoin("produtos", "produtos.id", "lotes.id_produto")
            .leftJoin("medidas", "medidas.id", "produtos.id_medida")
            .whereNotNull("lotes.dt_validade");
        const semana = [];
        const mes = [];
        lotes.forEach((l) => {
            const validade = new Date(l.dt_validade);
            const itemFormatado = {
                nome: l.produto_nome,
                lote: l.lote_codigo,
                data: (0, date_fns_1.format)(validade, "dd/MM/yyyy", { locale: locale_1.ptBR }),
                quantidade: `${Number(l.quantidade).toFixed(2)} ${l.medida_sigla}`,
            };
            // lotes que vencem em até 7 dias
            if (validade >= today && validade <= oneWeekLater) {
                semana.push(itemFormatado);
            }
            // lotes que vencem até o final do mês (mas não na semana para evitar duplicidade)
            if (validade > oneWeekLater && validade <= endOfMonth) {
                mes.push(itemFormatado);
            }
        });
        res.json({ semana, mes });
    }
    catch (err) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json(utils_1.Status.error("LOTE3001", `Erro interno: ${err === null || err === void 0 ? void 0 : err.message}`));
    }
});
exports.getExpiringBatches = getExpiringBatches;
