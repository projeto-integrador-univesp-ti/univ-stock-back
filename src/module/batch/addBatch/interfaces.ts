interface AddBatchRequest {
  dt_fabricacao: Date;
  dt_validade: Date;
  id_produto: number;
  observacoes: string;
}

interface AddBatchResponse { }

type Batch = {
  id: string;
  dt_fabricacao: Date;
  dt_validade: Date;
  observacoes: string;
  id_produto: number;
};

export { AddBatchRequest, AddBatchResponse, Batch };
