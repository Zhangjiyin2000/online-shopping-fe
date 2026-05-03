import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class UserOrderService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  getAllOrders() {
    return this.http.get<Order[]>(`${this.baseUrl}/orders/all`);
  }

  getOrderDetail(orderId: number) {
    return this.http.get<Order>(`${this.baseUrl}/orders/${orderId}`);
  }

  cancelOrder(orderId: number): Observable<Order> {
    return this.http.patch<Order>(`${this.baseUrl}/orders/${orderId}/cancel`, {});
  }

}
