interface UpdateProductRequest extends Product {}

interface UpdateProductResponse {
  data: Product;
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

export { Product, UpdateProductRequest, UpdateProductResponse };
