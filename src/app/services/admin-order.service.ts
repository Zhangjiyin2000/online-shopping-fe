import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminOrder } from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  getAllOrders() {
    return this.http.get<AdminOrder[]>(`${this.baseUrl}/orders/all`);
  }

  getOrderDetail(orderId: number) {
    return this.http.get<AdminOrder>(`${this.baseUrl}/orders/${orderId}`);
  }

  cancelOrder(orderId: number): Observable<AdminOrder> {
    return this.http.patch<AdminOrder>(`${this.baseUrl}/orders/${orderId}/cancel`, {});
  }

  completeOrder(orderId: number): Observable<AdminOrder> {
    return this.http.patch<AdminOrder>(`${this.baseUrl}/orders/${orderId}/complete`, {});
  }
}
