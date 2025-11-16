"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleSchema = void 0;
const zod_1 = require("zod");
const SaleSchema = zod_1.z.object({
    id: zod_1.z.string().max(45).optional(),
    dataInicio: zod_1.z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/).optional(),
    dataFim: zod_1.z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/).optional(),
});
exports.SaleSchema = SaleSchema;
