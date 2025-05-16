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
  quantidade: number;
  preco_unidade: number;
  perecivel: number;
  id_medida: number;
};

export { Product, DeleteProductRequest, DeleteProductResponse };
