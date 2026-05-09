import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AdminOrder } from 'src/app/models/order.model';
import { AdminOrderService } from 'src/app/services/admin-order.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent {
  @Output() orderStatusChanged = new EventEmitter<void>();

  order: AdminOrder = {} as AdminOrder;
  orders: AdminOrder[] = [];
  displayedColumns: string[] = [
    'orderId',
    'datePlaced',
    'orderStatus',
    'items',
    'userId',
    'username',
    'total',
    'actions'
  ];

  isLoading = false;
  successMessage = '';
  errorMessage = '';
  page = 1;
  pageSize = 5;
  totalOrders = 0;
  totalPages = 0;

  constructor(private adminOrderService: AdminOrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(page: number = this.page): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.adminOrderService.getOrdersPage(page).subscribe({
      next: (response) => {
        this.orders = response.orders;
        this.page = response.page;
        this.pageSize = response.pageSize;
        this.totalOrders = response.totalOrders;
        this.totalPages = response.totalPages;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load orders for admin', error);
        this.errorMessage = `Failed to load orders for admin. Status: ${error.status || 'unknown'}`;
        this.isLoading = false;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.loadOrders(event.pageIndex + 1);
  }

  getProductNames(order: AdminOrder): string {
    return order.items.map(item => item.productName).join(', ');
  }

  getOrderTotal(order: AdminOrder): number {
    return order.items.reduce((total, item) => {
      return total + item.quantity * item.purchasedPrice;
    }, 0);
  }

  completeOrder(order: AdminOrder): void {
    this.adminOrderService.completeOrder(order.orderId).subscribe({
      next: (order) => {
        this.successMessage = `Completed #${order.orderId} order successfully.`;
        this.loadOrders();
        this.orderStatusChanged.emit();
      },
      error: (error: HttpErrorResponse) => {
        console.log('Failed to complete an order.', error);
        this.errorMessage = `Failed to complete an order. Status: ${error.status || 'unknown'}`;
      }
    });
  }

  cancelOrder(order: AdminOrder): void {
    this.adminOrderService.cancelOrder(order.orderId).subscribe({
      next: (order) => {
        this.successMessage = `Canceled #${order.orderId} order successfully.`;
        this.loadOrders();
        this.orderStatusChanged.emit();
      },
      error: (error: HttpErrorResponse) => {
        console.log('Failed to cancel an order.', error);
        this.errorMessage = `Failed to cancel an order. Status: ${error.status || 'unknown'}`;
      }
    });
  }
}
