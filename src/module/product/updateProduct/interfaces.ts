type Product = {
    id: string;
    nome: string;
    marca: string;
    quantidade: number;
    preco_unidade: number;
    perecivel: number;
    id_medida: number;
  };
  
interface UpdateProductRequest {
    nome: string;
    marca: string;
    quantidade: number;
    preco_unidade: number;
    perecivel: number;
    id_medida: number;
  }
export { Product, UpdateProductRequest };
  