enum MovementType {
  ENTRADA = 'ENTRADA', 
  SAIDA = 'SAIDA',
}

interface AddMovementRequest {
  id_produto: string;
  id_usuario: string;
  email: string;
  movimento: MovementType;
}

interface AddMovementResponse { }

type Movement = {
  id: string;
  id_produto: string;
  id_usuario: string;
  email: string;
  movimento: MovementType;
  quantidade: number;
};

export { AddMovementRequest, AddMovementResponse, Movement };
