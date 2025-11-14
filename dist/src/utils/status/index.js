"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.status = void 0;
const http_status_codes_1 = require("http-status-codes");
const format_1 = require("../format");
const typing_1 = require("../../typing");
const getResponse = (statusCode, data, error) => {
    if (error) {
        if (process.env.ENVIRONMENT !== "prd") {
            return {
                message: error.message,
                code: error.code,
                status: statusCode,
                reason: `${statusCode} - ${(0, http_status_codes_1.getReasonPhrase)(statusCode)}`,
                validations: error.validations,
                error: true,
            };
        }
        return {
            message: error.code.split("AUTE")[1] === "AUTE" ? 'Autenticação inválida' : error.message,
            status: statusCode,
            error: true,
        };
    }
    return data;
};
const error = (code, message, validations) => {
    const isPRD = process.env.ENVIRONMENT === "prd";
    validations === null || validations === void 0 ? true : delete validations["_errors"];
    return { code, message, validations: !isPRD ? validations : undefined };
};
exports.error = error;
const status = (_, res, next) => {
    const json = res.json;
    res.json = function (obj) {
        var _a;
        if ("/" + res.req.originalUrl.split("/")[1] === typing_1.BaseRoute.authentication) {
            obj === null || obj === void 0 ? true : delete obj.senha;
            (_a = obj === null || obj === void 0 ? void 0 : obj.dataValues) === null || _a === void 0 ? true : delete _a.senha;
        }
        if (obj === null || obj === void 0 ? void 0 : obj.dataValues) {
            obj.dataValues = (0, format_1.recursiveObjectTo)(obj.dataValues, format_1.snakeToCamelCase);
        }
        else {
            obj = (0, format_1.recursiveObjectTo)(obj, format_1.snakeToCamelCase);
        }
        const keysOfObj = Object.keys(obj);
        if (res.statusCode >= 400) {
            if (keysOfObj.length >= 2 && keysOfObj[0] === "code" && keysOfObj[1] === "message") {
                if (res.statusCode === 400) {
                    const split = obj.message.split("of relation");
                    obj.message = split.length == 2 ? split[0].replace("in column", "in the") + "parameter" : obj.message;
                }
                json.call(this, getResponse(res.statusCode, undefined, obj));
            }
            else {
                if (process.env.ENVIRONMENT !== "prd") {
                    json.call(this, { error: "Erro não tratado!", route: res.req.originalUrl, obj });
                }
                else {
                    json.call(this, { error: "Erro não tratado!", route: res.req.originalUrl });
                }
            }
        }
        else {
            json.call(this, getResponse(res.statusCode, obj));
        }
    };
    next();
};
exports.status = status;
