interface ExistsResquest {
  id: string;
}

interface ExistsResponse {
  data: {
    exists: boolean;
  };
}

type Authentication = {
  email: string;
  senha: string;
  email_validado: number;
};

export { ExistsResquest, ExistsResponse, Authentication };
