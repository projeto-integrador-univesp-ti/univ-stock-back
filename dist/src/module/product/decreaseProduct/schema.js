"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecreaseSchema = void 0;
const zod_1 = require("zod");
const DecreaseItemSchema = zod_1.z.object({
    codigo: zod_1.z.string(),
    quantidade: zod_1.z.number(),
});
const DecreaseSchema = zod_1.z.array(DecreaseItemSchema);
exports.DecreaseSchema = DecreaseSchema;
