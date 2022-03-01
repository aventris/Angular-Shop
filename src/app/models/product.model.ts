export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface CartProduct extends Product {
  quantity: number;
}

export interface RegisterProduct extends Partial<Product> {}
