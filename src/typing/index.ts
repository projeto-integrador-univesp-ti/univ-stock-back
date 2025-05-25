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
  measure = "/measure",
  supplier = "/supplier",
  login = "/login",
  movement = "/movement",
  contact = "/contact",
  contactType = "/contactType",
  sale = "/sales",
}

export { BaseRoute, Error };
