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
exports.addMeasure = void 0;
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../../../utils");
const database_1 = require("../../../database");
const ulid_1 = require("ulid");
const addMeasure = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nome, sigla } = req.body;
        if (!nome || nome.length > 45) {
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json(utils_1.Status.error("MED1002", "Nome inválido ou ausente (máximo 45 caracteres)"));
        }
        if (!sigla || sigla.length > 45) {
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json(utils_1.Status.error("MED1003", "Sigla inválida ou ausente (máximo 45 caracteres)"));
        }
        const medida = {
            id: (0, ulid_1.ulid)(),
            nome,
            sigla,
        };
        yield (0, database_1.db)("medidas").insert(medida);
        res
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json({ message: "Medida adicionada com sucesso", data: medida });
    }
    catch (err) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json(utils_1.Status.error("Algo deu errado", `Erro interno: ${err === null || err === void 0 ? void 0 : err.message}`));
    }
});
exports.addMeasure = addMeasure;
