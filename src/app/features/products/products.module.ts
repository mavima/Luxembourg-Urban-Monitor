// Register Feature (NgModule style) 
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from 'src/app/core/stores/products/products.effects';
import { productsFeatureKey, productsReducer } from 'src/app/core/stores/products/products.reducer';


@NgModule({
  imports: [
    StoreModule.forFeature(productsFeatureKey, productsReducer),
    EffectsModule.forFeature([ProductsEffects]),
  ],
})
export class ProductsModule {}