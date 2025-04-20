interface GetSuppliersRequest {}

interface GetSuppliersResponse {
  data: Supplier[]
 }

type Supplier = {
  id: string;
  cnpj: number;
  nome_razao_social: string;
  nome_fantasia: string;
  cep_logradouro: number;
  nome_lograoduro: string;
  numero_logradouro: number;
  complemento_lograodouro: string;
  bairro_logradouro: string;
  cidade_logradouro: string;
  estado_logradouro: string;
  observacoes: string;
};

export { GetSuppliersRequest, GetSuppliersResponse, Supplier };
