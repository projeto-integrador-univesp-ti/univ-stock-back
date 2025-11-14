"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserSchema = void 0;
const zod_1 = require("zod");
const AddUserSchema = zod_1.z.object({
    nome: zod_1.z
        .string()
        .max(26, "Nome de usuario deve ter no máximo 80 caracteres.")
        .min(1, "Nome é obrigatório."),
    dt_nascimento: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Data de nascimento inválida (YYYY-MM-DD)",
    }),
});
exports.AddUserSchema = AddUserSchema;
