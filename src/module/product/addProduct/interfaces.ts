interface AddProductRequest {
  nome: string;
  marca: string;
  quantidade: number;
  preco_unidade: number;
  perecivel: boolean;
  id_medida: number;
}

interface AddProductResponse { }

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

export { AddProductRequest, AddProductResponse, Product };
