import { ZodFormattedError } from "zod";

interface Error {
  code: string;
  message: string;
  validations: ZodFormattedError<unknown> | undefined;
}

enum BaseRoute {
  version = "/",
  authentication = "/auth",
  user = "/user",
  product = "/product",
  batch = "/batch",
}

export { BaseRoute, Error };
