import { createReducer, on } from "@ngrx/store";
import { initialProductsState } from "./products.state";
import * as ProductsActions from "./products.actions";

export const productsFeatureKey = 'products';

export const productsReducer = createReducer(
  initialProductsState,

  on(ProductsActions.loadProducts, state => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
  })),

  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);