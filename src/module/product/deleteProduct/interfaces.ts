interface DeleteProductRequest {
  id: string;
}

interface DeleteProductResponse {
  data: {
    message: string;
  };
}

type Product = {
  id: string;
  nome: string;
  marca: string;
  codigo: string
  quantidade: number;
  preco_unidade: number;
  perecivel: boolean;
  id_medida: number;
};

export { Product, DeleteProductRequest, DeleteProductResponse };
