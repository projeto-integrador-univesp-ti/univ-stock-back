interface GetBatchesRequest {}

interface GetBatchesResponse {
  data: Batch[]
 }

type Batch = {
  id: string;
  dt_fabricacao: Date;
  dt_validade: Date;
  observacoes: string;
  id_produto: number;
};

export { GetBatchesRequest, GetBatchesResponse, Batch };
