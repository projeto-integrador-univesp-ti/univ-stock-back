interface AddMeasureRequest {
  nome: string;
  sigla: string;
}

interface AddMeasureResponse { }

type Measure = {
  id: string;
  nome: string;
  sigla: string;
};

export { AddMeasureRequest, AddMeasureResponse, Measure };
