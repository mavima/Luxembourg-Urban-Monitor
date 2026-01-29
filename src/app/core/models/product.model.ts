export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface ProductDetails extends Product {
  description: string;
  tags: string[];
} 
