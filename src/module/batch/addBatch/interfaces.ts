interface AddBatchRequest {
  dt_fabricacao: Date;
  dt_validade: Date;
  id_produto: number;
}

interface AddBatchResponse { }

type Product = {
  id: string;
  dt_fabricacao: Date;
  dt_validade: Date;
  id_produto: number;
};

export { AddBatchRequest, AddBatchResponse, Product };
