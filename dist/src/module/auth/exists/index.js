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
exports.exists = void 0;
const http_status_codes_1 = require("http-status-codes");
const database_1 = require("../../../database");
const utils_1 = require("../../../utils");
const schema_1 = require("./schema");
const exists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield schema_1.ExistsSchema.safeParseAsync(req.body);
        if (result.error) {
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json(utils_1.Status.error("AUTH1001", `Parâmetro inválido:`, result.error.format()));
            return;
        }
        const auth = yield (0, database_1.db)("autenticacao")
            .where("email", "=", result.data.email)
            .first();
        res.json({ data: { exists: Boolean(auth) } });
    }
    catch (err) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json(utils_1.Status.error("AUTH1002", `Erro interno: ${err === null || err === void 0 ? void 0 : err.message}`));
    }
});
exports.exists = exists;
