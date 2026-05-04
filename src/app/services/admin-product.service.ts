import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminProductDetail, AdminProductRequest } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<AdminProductDetail[]>(`${this.baseUrl}/products/all`);
  }

  getProductDetailById(productId: number) {
    return this.http.get<AdminProductDetail>(`${this.baseUrl}/products/${productId}`);
  }

  updateProduct(productId: number, payload: AdminProductRequest) {
    return this.http.patch<AdminProductDetail>(`${this.baseUrl}/products/${productId}`, payload);
  }

  createAProduct(payload: AdminProductRequest) {
    return this.http.post<AdminProductDetail>(`${this.baseUrl}/products`, payload);
  }
}
