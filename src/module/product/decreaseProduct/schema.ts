import { isValid } from "ulid";
import { z } from "zod";

const DecreaseItemSchema = z.object({
  codigo: z.string(),
  quantidade: z.number(),
});

const DecreaseSchema = z.array(DecreaseItemSchema);

export { DecreaseSchema };
