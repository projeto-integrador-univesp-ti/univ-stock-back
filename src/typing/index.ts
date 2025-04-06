interface Error {
  code: string;
  message: string;
}

enum BaseRoute {
  version = "/",
  authentication = "/authentication",
  user = '/user'
}

export { BaseRoute, Error };

