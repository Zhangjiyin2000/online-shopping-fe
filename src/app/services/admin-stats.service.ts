import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductProfitSummary, PurchasedProductSummary } from '../models/stats.model';

@Injectable({
  providedIn: 'root'
})
export class AdminStatsService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  getMostPopularProducts(limit: number) {
    return this.http.get<PurchasedProductSummary[]>(`${this.baseUrl}/products/popular/${limit}`);
  }

  getMostProfitableProducts(limit: number) {
    return this.http.get<ProductProfitSummary[]>(`${this.baseUrl}/products/profit/${limit}`);
  }
}
