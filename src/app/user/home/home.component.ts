import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Order, OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  orders: Order[] = [];
  displayedColumns: string[] = [
    'orderId',
    'datePlaced',
    'orderStatus',
    'items',
    'total',
    'actions'
  ];

  isLoading = false;
  errorMessage = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load orders', error);
        this.errorMessage = `Failed to load orders. Status: ${error.status || 'unknown'}`;
        this.isLoading = false;
      }
    });
  }

  getProductNames(order: Order): string {
    return order.items.map(item => item.productName).join(', ');
  }

  getOrderTotal(order: Order): number {
    return order.items.reduce((total, item) => {
      return total + item.quantity * item.purchasedPrice;
    }, 0);
  }

}
