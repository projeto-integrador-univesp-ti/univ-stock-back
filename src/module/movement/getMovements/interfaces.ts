enum MovementType {
  ENTRADA = 'ENTRADA', 
  SAIDA = 'SAIDA',
}

interface GetMovementsRequest {}

interface GetMovementsResponse {
  data: Movement[]
 }

type Movement = {
  id: string;
  id_produto: string;
  id_usuario: string;
  email: string;
  movimento: MovementType;
  quantidade: number;
};

export { GetMovementsRequest, GetMovementsResponse, Movement };
