interface GetUserResquest {
    id: string
}

interface GetUserResponse {
    data: User
}

type User = {
    id: string
    nome: string
    data_nascimento: string 
}

interface Produto {
    id: string;
    nome: string;
    marca: string;
    quantidade: number;
    preco_unidade: number;
    perecivel: string;
    id_medida: number;
  }
  
interface AddProdutoRequest {
    id: string;
    nome: string;
    marca: string;
    quantidade: number;
    preco_unidade: number;
    perecivel: string;
    id_medida: number;
  }

export { GetUserResquest, GetUserResponse, User, Produto, AddProdutoRequest};
