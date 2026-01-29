import { Product, ProductDetails } from "../../models/product.model";

export interface ProductsState{
  products: Product[];
  selectedProduct: ProductDetails | null;
  loading: boolean;
  error: string | null ;
}
export const initialProductsState: ProductsState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};