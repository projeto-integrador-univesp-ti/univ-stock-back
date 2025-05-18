interface DecreaseProductRequest extends Product {
  products: Product[];
}

interface DecreaseProductResponse {
  data: { message: string };
}

type Product = {
  id: string;
  amount: number;
};

export { Product, DecreaseProductRequest, DecreaseProductResponse };
