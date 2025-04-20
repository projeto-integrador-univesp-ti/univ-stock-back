interface GetMeasuresRequest {}

interface GetMeasuresResponse {
  data: Measure[]
 }

type Measure = {
  id: string;
  nome: string;
  sigla: string;
};

export { GetMeasuresRequest, GetMeasuresResponse, Measure };
