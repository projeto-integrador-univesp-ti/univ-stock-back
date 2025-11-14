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
exports.getProducts = void 0;
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../../../utils");
const database_1 = require("./../../../database");
const getProducts = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const produtos = yield (0, database_1.db)("produtos").select("*");
        res.json({ data: produtos });
    }
    catch (err) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json(utils_1.Status.error("PROD2001", `Erro interno: ${err === null || err === void 0 ? void 0 : err.message}`));
    }
});
exports.getProducts = getProducts;
