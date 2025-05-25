import { z } from "zod";

const SaleSchema = z.object({
  id: z.string().max(45),
});

export { SaleSchema };
