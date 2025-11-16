interface GetExpiringBatchesRequest {}

export interface ExpiringBatchItem {
  nome: string;
  lote: string;
  data: string;
  quantidade: string;
}

export interface MinItem {
  nome: string;
  quantidade: string;
  minimo: string;
}

interface GetExpiringBatchesResponse {
  semana: ExpiringBatchItem[];
  mes: ExpiringBatchItem[];
  estoqueBaixo: MinItem[];
}

export { GetExpiringBatchesRequest, GetExpiringBatchesResponse };
