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
exports.addSupplier = void 0;
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../../../utils");
const database_1 = require("../../../database");
const ulid_1 = require("ulid");
const addSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cnpj, nome_razao_social, nome_fantasia, cep_logradouro, nome_logradouro, numero_logradouro, complemento_logradouro, bairro_logradouro, cidade_logradouro, estado_logradouro, observacoes } = req.body;
        if (!cnpj || cnpj.toString().length !== 14) {
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json(utils_1.Status.error("FOR1001", "CNPJ inválido (deve conter 14 dígitos)"));
        }
        if (!nome_razao_social || nome_razao_social.length > 45) {
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json(utils_1.Status.error("FOR1002", "Nome inválido ou ausente (máximo 45 caracteres)"));
        }
        if (!nome_fantasia || nome_fantasia.length > 45) {
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json(utils_1.Status.error("FOR1003", "Nome inválido ou ausente (máximo 45 caracteres)"));
        }
        if (!cep_logradouro || cep_logradouro.toString().length !== 8) {
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json(utils_1.Status.error("FOR1004", "CEP inválido (deve conter 8 dígitos)"));
        }
        if (!nome_logradouro || nome_logradouro.length > 45) {
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json(utils_1.Status.error("FOR1005", "Nome inválido ou ausente (máximo 45 caracteres)"));
        }
        if (!numero_logradouro || numero_logradouro < 1) {
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json(utils_1.Status.error("FOR1006", "Numero inválido (deve conter pelo menos 1 dígitos)"));
        }
        if (!bairro_logradouro || bairro_logradouro.length > 45) {
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json(utils_1.Status.error("FOR1007", "Bairro inválido ou ausente (máximo 45 caracteres)"));
        }
        if (!cidade_logradouro || cidade_logradouro.length > 45) {
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json(utils_1.Status.error("FOR1008", "Cidade inválida ou ausente (máximo 45 caracteres)"));
        }
        if (!estado_logradouro || estado_logradouro.length > 45) {
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json(utils_1.Status.error("FOR1009", "Estado inválido ou ausente (máximo 45 caracteres)"));
        }
        const fornecedor = {
            id: (0, ulid_1.ulid)(),
            cnpj,
            nome_razao_social,
            nome_fantasia,
            cep_logradouro,
            nome_logradouro,
            numero_logradouro,
            complemento_logradouro,
            bairro_logradouro,
            cidade_logradouro,
            estado_logradouro,
            observacoes
        };
        yield (0, database_1.db)("fornecedores").insert(fornecedor);
        res
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json({ message: "Fornecedor adicionado com sucesso", data: fornecedor });
    }
    catch (err) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json(utils_1.Status.error("Algo deu errado", `Erro interno: ${err === null || err === void 0 ? void 0 : err.message}`));
    }
});
exports.addSupplier = addSupplier;
