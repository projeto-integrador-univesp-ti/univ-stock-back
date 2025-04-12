type Module = {
  module: string;
  endpoinst: Endpoint[];
};
type Endpoint = {
  path: string;
  method: string;
  description: string;
  request: {
    params: Record<string, string>;
    body: Record<string, string>;
  };
  response: Record<string, unknown>;
};

export { Module };
