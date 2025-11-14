"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleSchema = void 0;
const zod_1 = require("zod");
const ProductSaleItemSchema = zod_1.z.object({
    id_produto: zod_1.z.string().max(26),
    id_medida: zod_1.z.number().int().positive(),
    quantidade: zod_1.z.number().nonnegative(),
    preco_unidade: zod_1.z.number().nonnegative(),
});
const SaleSchema = zod_1.z.object({
    valor_total: zod_1.z.number().nonnegative(),
    valor_pago: zod_1.z.number().nonnegative(),
    troco: zod_1.z.number().nonnegative(),
    produtos: zod_1.z.array(ProductSaleItemSchema),
});
exports.SaleSchema = SaleSchema;
