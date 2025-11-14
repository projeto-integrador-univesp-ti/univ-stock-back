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
exports.addMovement = void 0;
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../../../utils");
const database_1 = require("../../../database");
const ulid_1 = require("ulid");
const addMovement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_produto, id_usuario, email, movimento, quantidade } = req.body;
        if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json(utils_1.Status.error("MOV1001", "Email inválido ou ausente"));
        }
        const valoresValidosMovimento = ['entrada', 'saida'];
        if (!movimento || !valoresValidosMovimento.includes(movimento)) {
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json(utils_1.Status.error("MOV1002", "Entrada inválida (Apenas use Entrada ou Saída)"));
        }
        const movimentacao = {
            id: (0, ulid_1.ulid)(),
            id_produto,
            id_usuario,
            email,
            movimento,
            quantidade,
        };
        yield (0, database_1.db)("movimentacoes").insert(movimentacao);
        res
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json({ message: "Movimentação adicionada com sucesso", data: movimentacao });
    }
    catch (err) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json(utils_1.Status.error("Algo deu errado", `Erro interno: ${err === null || err === void 0 ? void 0 : err.message}`));
    }
});
exports.addMovement = addMovement;
