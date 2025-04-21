interface AddLoginRequest {
  email: string;
  dt_ultimo_acesso: Date;
}

interface AddLoginResponse { }

type Login = {
  id_usuario: string;
  email: string;
  dt_ultimo_acesso: Date;
};

export { AddLoginRequest, AddLoginResponse, Login };
