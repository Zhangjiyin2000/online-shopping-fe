import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface OrderItem {
  itemId: number;
  productId: number;
  productName: string;
  quantity: number;
  purchasedPrice: number;
}

export interface Order {
  orderId: number;
  datePlaced: string;
  orderStatus: string;
  items: OrderItem[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:8081/orders';

  constructor(private http: HttpClient) { }

  getAllOrders() {
    return this.http.get<Order[]>(`${this.baseUrl}/all`);
  }


}
