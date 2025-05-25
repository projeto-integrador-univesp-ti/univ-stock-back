interface AddSaleRequest {
  valor_total: number
  valor_pago: number
  troco: number
  produtos: Product[];
}

interface AddSaleResponse {
  data: { message: string };
}

type Product = {
  id_produto: string;
  id_medida: string;
  quantidade: number;
  preco_unidade:number
};

export { Product, AddSaleRequest, AddSaleResponse };
