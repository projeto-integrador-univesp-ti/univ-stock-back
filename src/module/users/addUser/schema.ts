import { z } from "zod";

const AddUserSchema = z.object({
  nome: z
    .string()
    .max(26, "Nome de usuario deve ter no máximo 80 caracteres.")
    .min(1, "Nome é obrigatório."),
  dt_nascimento: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Data de nascimento inválida (YYYY-MM-DD)",
  }),
});

export { AddUserSchema };
