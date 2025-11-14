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
exports.addContact = void 0;
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../../../utils");
const database_1 = require("../../../database");
const ulid_1 = require("ulid");
const addContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_tipo_contato, nome } = req.body;
        if (!nome || nome.length > 45) {
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json(utils_1.Status.error("CONT1001", "Nome inválido ou ausente (máximo 45 caracteres)"));
        }
        if (id_tipo_contato == undefined || typeof id_tipo_contato !== "number") {
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json(utils_1.Status.error("CONT1002", "Valor inválido (insira o id do tipo de contato correto)"));
        }
        const contato = {
            id: (0, ulid_1.ulid)(),
            nome: "string",
            id_tipo_contato: "string",
        };
        yield (0, database_1.db)("contatos").insert(contato);
        res
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json({ message: "Contato adicionado com sucesso", data: contato });
    }
    catch (err) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json(utils_1.Status.error("Algo deu errado", `Erro interno: ${err === null || err === void 0 ? void 0 : err.message}`));
    }
});
exports.addContact = addContact;
