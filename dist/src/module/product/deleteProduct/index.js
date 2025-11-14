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
exports.deleteProduct = void 0;
const http_status_codes_1 = require("http-status-codes");
const database_1 = require("../../../database");
const utils_1 = require("../../../utils");
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const produto = yield (0, database_1.db)("produtos").where({ id }).first();
        if (!produto) {
            res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json(utils_1.Status.error("PROD1009", "Produto não encontrado"));
        }
        yield (0, database_1.db)("produtos").where({ id }).delete();
        res.status(http_status_codes_1.StatusCodes.OK).json({
            data: {
                message: "Produto removido com sucesso",
            },
        });
    }
    catch (err) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json(utils_1.Status.error("ERRO_DELETE", `Erro interno: ${err === null || err === void 0 ? void 0 : err.message}`));
    }
});
exports.deleteProduct = deleteProduct;
