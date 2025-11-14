"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleSchema = void 0;
const zod_1 = require("zod");
const SaleSchema = zod_1.z.object({
    id: zod_1.z.string().max(45),
});
exports.SaleSchema = SaleSchema;
