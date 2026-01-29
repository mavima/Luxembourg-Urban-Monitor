import { inject, Injectable } from "@angular/core";
import { Product } from "../models/product.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class ProductsService {
    private http = inject(HttpClient);
    getProducts() {
        return this.http.get<Product[]>("/mock-api/fakeapi/products");
        //return this.http.get<Product[]>('https://jsonplaceholder.typicode.com/posts'); // ok.
    }
}
