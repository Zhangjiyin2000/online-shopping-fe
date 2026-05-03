import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProductDetail } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class UserProductService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  getProductDetailById(productId: number) {
    return this.http.get<UserProductDetail>(`${this.baseUrl}/products/${productId}`);
  }

  getAllProducts() {
    return this.http.get<UserProductDetail[]>(`${this.baseUrl}/products/all`);
  }
}
