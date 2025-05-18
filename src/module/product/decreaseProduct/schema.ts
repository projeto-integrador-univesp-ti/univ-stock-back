import { isValid } from "ulid";
import { z } from "zod";

const DecreaseItemSchema = z.object({
  id: z.string().refine((val) => isValid(val), {
    message: "ULID inválido.",
  }),
  amount: z.number(),
});

const DecreaseSchema = z.array(DecreaseItemSchema);

export { DecreaseSchema };
