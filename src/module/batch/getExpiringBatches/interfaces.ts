interface GetExpiringBatchesRequest {}

export interface ExpiringBatchItem {
  nome: string;
  lote: string;
  data: string;
  quantidade: string;
}

interface GetExpiringBatchesResponse {
  semana: ExpiringBatchItem[];
  mes: ExpiringBatchItem[];
}

export { GetExpiringBatchesRequest, GetExpiringBatchesResponse };
