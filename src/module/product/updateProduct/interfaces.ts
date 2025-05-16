interface UpdateProductRequest extends Product {}

interface UpdateProductResponse {
  data: Product;
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

export { Product, UpdateProductRequest, UpdateProductResponse };
