interface AddSupplierRequest {
  cnpj: number;
  nome_razao_social: string;
  nome_fantasia: string;
  cep_logradouro: number;
  nome_logradouro: string;
  numero_logradouro: number;
  complemento_logradouro: string;
  bairro_logradouro: string;
  cidade_logradouro: string;
  estado_logradouro: string;
  observacoes: string;
}

interface AddSupplierResponse { }

type Supplier = {
  id: string;
  cnpj: number;
  nome_razao_social: string;
  nome_fantasia: string;
  cep_logradouro: number;
  nome_logradouro: string;
  numero_logradouro: number;
  complemento_logradouro: string;
  bairro_logradouro: string;
  cidade_logradouro: string;
  estado_logradouro: string;
  observacoes: string;
};

export { AddSupplierRequest, AddSupplierResponse, Supplier };
