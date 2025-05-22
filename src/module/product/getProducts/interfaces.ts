interface GetProductsRequest {}

interface GetProductsResponse {
  data: Product[]
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

export { GetProductsRequest, GetProductsResponse, Product };
