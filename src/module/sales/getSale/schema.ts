import { z } from "zod";

const SaleSchema = z.object({
  id: z.string().max(45).optional(),
  dataInicio: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/).optional(),
  dataFim: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/).optional(),
});

export { SaleSchema };