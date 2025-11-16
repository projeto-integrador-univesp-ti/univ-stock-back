interface GetSaleRequest {
  id?: string;
  dataInicio?: string;
  dataFim?: string;
}

interface GetSaleResponse {
  data: SaleWithProducts[];
}

type Sale = {
  id: string;
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

interface SaleWithProducts extends Sale {
  produtos: Product[];
}

export { Sale, Product, GetSaleRequest, GetSaleResponse };
