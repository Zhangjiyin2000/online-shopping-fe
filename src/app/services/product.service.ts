import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface PurchasedProductSummary {
  productId: number;
  name: string;
  totalQuantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  getMostFrequentlyPurchasedProducts(limit: number) {
    return this.http.get<PurchasedProductSummary[]>(`${this.baseUrl}/products/frequent/${limit}`);
  }

  getMostRecentlyPurchasedProducts(limit: number) {
    return this.http.get<PurchasedProductSummary[]>(`${this.baseUrl}/products/recent/${limit}`);
  }
}
