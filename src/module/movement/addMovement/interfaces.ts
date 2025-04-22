interface AddMovementRequest {
  id_produto: string;
  id_usuario: string;
  email: string;
  movimento: Enumerator;
}

interface AddMovementResponse { }

type Movement = {
  id: string;
  id_produto: string;
  id_usuario: string;
  email: string;
  movimento: Enumerator;
};

export { AddMovementRequest, AddMovementResponse, Movement };
