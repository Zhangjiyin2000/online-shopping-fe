import { Component, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserOrderService } from 'src/app/services/user-order.service';
import { Order } from 'src/app/models/order.model';
import { TopItemsComponent } from '../stats/top-items/top-items.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild(TopItemsComponent) topItems?: TopItemsComponent;

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
  successMessage = '';
  errorMessage = '';

  constructor(private userOrderService: UserOrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.userOrderService.getAllOrders().subscribe({
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

  cancelOrder(order: Order): void {

    this.userOrderService.cancelOrder(order.orderId).subscribe({
      next: (updatedOrder) => {
        this.orders = this.orders.map(existingOrder =>
          existingOrder.orderId === updatedOrder.orderId ? updatedOrder : existingOrder
        );
        // Or load order again to guarantee the frontend matches the database
        // this.loadOrders();
        this.successMessage = `Canceled Order#${order.orderId} successfully.`;
        this.topItems?.loadTopProducts();
      },
      error: () => {
        this.errorMessage = `Failed to cancel order#${order.orderId}.`;
      }
    });
  }
}
