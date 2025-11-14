import { z } from "zod";

const ProductSaleItemSchema = z.object({
  id_produto: z.string().max(26),
  id_medida: z.number().int().positive(),
  quantidade: z.number().nonnegative(),
  preco_unidade: z.number().nonnegative(),
});

const SaleSchema = z.object({
  valor_total: z.number().nonnegative(),
  valor_pago: z.number().nonnegative(),
  troco: z.number().nonnegative(),
  produtos: z.array(ProductSaleItemSchema),
});

export { SaleSchema };
