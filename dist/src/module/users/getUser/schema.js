"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserSchema = void 0;
const ulid_1 = require("ulid");
const zod_1 = require("zod");
const GetUserSchema = zod_1.z.object({
    id: zod_1.z.string().refine((val) => (0, ulid_1.isValid)(val), {
        message: "ULID inválido.",
    }),
});
exports.GetUserSchema = GetUserSchema;
