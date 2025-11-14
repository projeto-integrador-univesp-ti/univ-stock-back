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
exports.addBatch = void 0;
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../../../utils");
const database_1 = require("../../../database");
const ulid_1 = require("ulid");
const addBatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dt_fabricacao, dt_validade, observacoes, id_produto, quantidade, codigo, } = req.body;
        if (!id_produto) {
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json(utils_1.Status.error("LOTE1001", "ID do produto inválido ou ausente"));
        }
        const produto = yield (0, database_1.db)("produtos").where({ id: id_produto }).first();
        if (!produto) {
            res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json(utils_1.Status.error("LOTE1002", "Produto não encontrado"));
        }
        if (quantidade == null || quantidade <= 0) {
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json(utils_1.Status.error("LOTE1003", "Quantidade inválida ou ausente"));
        }
        const perecivel = !!produto.perecivel;
        if (perecivel) {
            if (!dt_validade) {
                res
                    .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                    .json(utils_1.Status.error("LOTE1004", "Data de validade obrigatória para produtos perecíveis"));
            }
        }
        const lote = {
            id: (0, ulid_1.ulid)(),
            codigo,
            dt_fabricacao: perecivel && dt_fabricacao
                ? new Date(dt_fabricacao.split("/").reverse().join("-"))
                : null,
            dt_validade: perecivel && dt_validade
                ? new Date(dt_validade.split("/").reverse().join("-"))
                : null,
            observacoes,
            id_produto,
            quantidade,
        };
        yield database_1.db.transaction((trx) => __awaiter(void 0, void 0, void 0, function* () {
            yield trx("lotes").insert(lote);
            yield trx("produtos")
                .where({ id: id_produto })
                .increment("quantidade", quantidade);
        }));
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            message: "Lote adicionado e quantidade do produto atualizada com sucesso",
            data: lote,
        });
    }
    catch (err) {
        console.error(err);
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json(utils_1.Status.error("LOTE5000", `Erro interno: ${err === null || err === void 0 ? void 0 : err.message}`));
    }
});
exports.addBatch = addBatch;
