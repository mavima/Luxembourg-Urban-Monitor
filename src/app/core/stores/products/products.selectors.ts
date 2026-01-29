// store/products.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.state';
import { productsFeatureKey } from './products.reducer';

export const selectProductsState =
  createFeatureSelector<ProductsState>(productsFeatureKey);

export const selectAllProducts = createSelector(
  selectProductsState,
  state => state.products
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  state => state.loading
);

export const selectProductsError = createSelector(
  selectProductsState,
  state => state.error
);
export const selectProductById = (productId: number) => createSelector(
  selectAllProducts,
  products => products.find(product => product.id === productId)
);