interface AddProductRequest { 
  codigo: string;
  id_medida: number;
  marca: string;
  nome: string;
  perecivel: boolean;
  preco_unidade: number;
  quantidade: number;
  quantidade_minima_estoque: number;
  codigo_lote: string;
  dt_fabricacao_lote: string;
  dt_validade_lote: string;
  observacoes_lote: string;
}

interface AddProductResponse {}

type Product = {
  id: string;
  nome: string;
  marca: string;
  codigo: string;
  quantidade: number;
  preco_unidade: number;
  perecivel: boolean;
  id_medida: number;
  quantidade_minima_estoque: number;
};

export { AddProductRequest, AddProductResponse, Product };
