import { z } from "zod";

const ExistsSchema = z.object({
  email: z
    .string()
    .email({ message: "Email inválido." })
    .min(1, { message: "Email obrigatorio." })
    .max(60, { message: "O email deve ter no máximo 60 caracteres." })
});

export { ExistsSchema };
