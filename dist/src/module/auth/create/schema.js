"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSchema = void 0;
const zod_1 = require("zod");
const CreateSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email({ message: "Email inválido." })
        .min(1, { message: "Email obrigatorio." })
        .max(60, { message: "O email deve ter no máximo 60 caracteres." })
});
exports.CreateSchema = CreateSchema;
