export interface Product {
  id: string;
  name: string;
  brand: {
    id: string;
    name: string;
  };
  price: number;
  cost: number;
}
