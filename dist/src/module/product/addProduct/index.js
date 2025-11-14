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
exports.addProduct = void 0;
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../../../utils");
const database_1 = require("../../../database");
const ulid_1 = require("ulid");
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trx = yield database_1.db.transaction();
    try {
        const { codigo, id_medida, marca, nome, perecivel, preco_unidade, quantidade, quantidade_minima_estoque, } = req.body;
        if (!nome || nome.length > 45) {
            yield trx.rollback();
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json(utils_1.Status.error("PROD1001", "Nome inválido ou ausente (máx. 45 caracteres)"));
        }
        if (!preco_unidade || preco_unidade > 99999) {
            yield trx.rollback();
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json(utils_1.Status.error("PROD1002", "Preço inválido (máx. 5 dígitos)"));
        }
        if (perecivel == undefined || typeof perecivel !== "boolean") {
            yield trx.rollback();
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json(utils_1.Status.error("PROD1003", "Campo 'perecivel' deve ser booleano"));
        }
        if (id_medida == undefined || typeof id_medida !== "number") {
            yield trx.rollback();
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json(utils_1.Status.error("PROD1004", "Campo 'id_medida' inválido"));
        }
        if (quantidade_minima_estoque == null || isNaN(quantidade_minima_estoque)) {
            yield trx.rollback();
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json(utils_1.Status.error("PROD1005", "Quantidade_miniquantidade_minima_estoque inválida"));
        }
        const existingProduct = yield trx("produtos").where({ codigo }).first();
        if (existingProduct) {
            yield trx.rollback();
            res
                .status(http_status_codes_1.StatusCodes.CONFLICT)
                .json(utils_1.Status.error("PROD1006", `Código de produto já existente: ${codigo}`));
        }
        const produtoId = (0, ulid_1.ulid)();
        const produto = {
            id: produtoId,
            codigo,
            id_medida,
            marca,
            nome,
            perecivel,
            preco_unidade,
            quantidade,
            quantidade_minima_estoque,
        };
        yield trx("produtos").insert(produto);
        yield trx.commit();
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            message: "Produto e lote adicionados com sucesso",
            data: Object.assign({}, produto),
        });
    }
    catch (err) {
        yield trx.rollback();
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json(utils_1.Status.error("PROD5000", `Erro interno: ${err === null || err === void 0 ? void 0 : err.message}`));
    }
});
exports.addProduct = addProduct;
