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
exports.getUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../../../utils");
const database_1 = require("./../../../database");
const schema_1 = require("./schema");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = schema_1.GetUserSchema.safeParse(req.params);
        if (result.error) {
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json(utils_1.Status.error("USER2001", `Parâmetro inválido.`, result.error.format()));
            return;
        }
        const usuario = yield (0, database_1.db)("usuarios").select("*").where("id", "=", result.data.id).first();
        if (usuario) {
            res.json({ data: usuario });
            return;
        }
        res
            .status(http_status_codes_1.StatusCodes.NOT_FOUND)
            .json(utils_1.Status.error("USER2002", "Usuário não encontrado."));
    }
    catch (err) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json(utils_1.Status.error("USER2003", `Erro interno: ${err === null || err === void 0 ? void 0 : err.message}`));
    }
});
exports.getUser = getUser;
