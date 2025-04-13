import { isValid } from "ulid";
import { z } from "zod";

const GetUserSchema = z.object({
  id: z.string().refine((val) => isValid(val), {
    message: "ULID inválido.",
  }),
});

export { GetUserSchema };
