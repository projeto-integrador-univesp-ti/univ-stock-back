interface GetLoginsRequest {}

interface GetLoginsResponse {
  data: Login[]
 }

type Login = {
  id_usuario: string;
  email: string;
  dt_ultimo_acesso: Date;
};

export { GetLoginsRequest, GetLoginsResponse, Login };
