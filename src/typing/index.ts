import { ZodFormattedError } from "zod";

interface Error {
  code: string;
  message: string;
  validations: ZodFormattedError<unknown> | undefined
}

enum BaseRoute {
  version = "/",
  authentication = "/authentication",
  user = '/user'
}

export { BaseRoute, Error };

