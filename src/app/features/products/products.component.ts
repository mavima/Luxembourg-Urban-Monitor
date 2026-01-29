import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProducts } from 'src/app/core/stores/products/products.actions';
import { selectAllProducts, selectProductsLoading } from 'src/app/core/stores/products/products.selectors';
import { SHARED_UI_MODULES } from 'src/app/shared-modules';

@Component({
  selector: 'app-products',
  imports: [SHARED_UI_MODULES],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private store = inject(Store);
  products$ = this.store.select(selectAllProducts);
  loading$ = this.store.select(selectProductsLoading);
  ngOnInit(): void {
    this.store.dispatch(loadProducts());
    //throw new Error('Method not implemented.');
  }

}
