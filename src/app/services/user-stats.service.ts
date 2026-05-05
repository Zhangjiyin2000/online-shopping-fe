import { Injectable } from '@angular/core';
import { PurchasedProductSummary, RecentPurchasedSummary } from '../models/stats.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserStatsService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  getMostFrequentlyPurchasedProducts(limit: number) {
    return this.http.get<PurchasedProductSummary[]>(`${this.baseUrl}/products/frequent/${limit}`);
  }

  getMostRecentlyPurchasedProducts(limit: number) {
    return this.http.get<RecentPurchasedSummary[]>(`${this.baseUrl}/products/recent/${limit}`);
  }
}
