import { isValid } from "ulid";
import { z } from "zod";

const ULID_REGEX = /^[0-9A-HJKMNP-TV-Z]{26}$/i;

const GetUserSchema = z.object({
  id: z.string().refine((val) => isValid(val), {
    message: "ULID inválido",
  }),
});

export { GetUserSchema };
