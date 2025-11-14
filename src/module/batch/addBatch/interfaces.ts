interface AddBatchRequest {
  codigo?: string;
  dt_fabricacao?: Date;
  dt_validade?: Date;
  id_produto: number;
  observacoes: string;
}

interface AddBatchResponse {}

type Batch = {
  id: string;
  codigo: string | null;
  dt_fabricacao: Date | null;
  dt_validade: Date | null;
  observacoes: string;
  id_produto: string;
  quantidade: number;
};

export { AddBatchRequest, AddBatchResponse, Batch };
