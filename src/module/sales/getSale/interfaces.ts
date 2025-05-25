interface GetSaleRequest {
  id: string;
}

interface GetSaleResponse {
  data: {
    troco: string;
    valor_total: string;
    valor_pago: string;
    data_venda: string;
    produtos: Product[];
  };
}

type Sale = {
  valor_total: string;
  valor_pago: string;
  troco: string;
  data_venda: string;
};

type Product = {
  nome: string;
  sigla: string;
  quantidade: string;
  preco_unidade: string;
};

export { Sale, Product, GetSaleRequest, GetSaleResponse };
