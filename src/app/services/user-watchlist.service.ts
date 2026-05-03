import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProductDetail } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class UserWatchlistService {
  addWatchlistByProductId(productId: number) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  getWatchlistProducts() {
    return this.http.get<UserProductDetail[]>(`${this.baseUrl}/watchlist/products/all`);
  }

  addProductToWatchlist(productId: number) {
    return this.http.post<UserProductDetail>(`${this.baseUrl}/watchlist/product/${productId}`, {});
  }

  removeProductFromWatchlist(productId: number) {
    return this.http.delete<UserProductDetail>(`${this.baseUrl}/watchlist/product/${productId}`);
  }
}
