interface GetMovementsRequest {}

interface GetMovementsResponse {
  data: Movement[]
 }

type Movement = {
  id: string;
  id_produto: string;
  id_usuario: string;
  email: String;
  movimento: Enumerator;
};

export { GetMovementsRequest, GetMovementsResponse, Movement };
