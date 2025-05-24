interface DecreaseProductRequest extends Product {
  produtos: Product[];
}

interface DecreaseProductResponse {
  data: { message: string };
}

type Product = {
  id: string;
  quantidade: number;
};

export { Product, DecreaseProductRequest, DecreaseProductResponse };
