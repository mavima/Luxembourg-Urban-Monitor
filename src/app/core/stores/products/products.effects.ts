import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductsService } from "../../services/products.service";
import * as ProductsActions from "./products.actions";
import { catchError, map, switchMap, of } from "rxjs";

@Injectable()
export class ProductsEffects {
    private actions$ = inject(Actions);
    private productsService = inject(ProductsService);

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActions.loadProducts),
            switchMap(() =>
                this.productsService.getProducts().pipe(
                    map((products) => {
                        console.log("Products fetched:", products);
                        return ProductsActions.loadProductsSuccess({
                            products,
                        });
                    }),
                    catchError((error) => {
                        console.error("HTTP ERROR:", error);
                        return of(
                            ProductsActions.loadProductsFailure({ error }),
                        );
                    }),
                ),
            ),
        ),
    );
}
