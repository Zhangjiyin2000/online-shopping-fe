import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminOrder } from 'src/app/models/order.model';
import { AdminOrderService } from 'src/app/services/admin-order.service';

@Component({
  selector: 'app-admin-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class AdminOrderDetailComponent {
  order: AdminOrder | null = null;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private adminOrderService: AdminOrderService
  ) {}

  ngOnInit(): void {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadOrderDetail(orderId);
  }

  loadOrderDetail(orderId: number): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.adminOrderService.getOrderDetail(orderId).subscribe({
      next: (order) => {
        this.order = order;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load order detail for admin.', error);
        this.errorMessage = `Failed to load order detail for admin. Status: ${error.status || 'unknown'}`;
        this.isLoading = false;
      }
    })
  }

  getOrderTotal(order: AdminOrder): number {
    return order.items.reduce((total, item) => {
      return total + item.quantity * item.purchasedPrice;
    }, 0);
  }

  cancelOrder(order: AdminOrder): void {
    this.adminOrderService.cancelOrder(order.orderId).subscribe({
      next: (order) => {
        this.order = order;
        this.successMessage = `Canceled #${order.orderId} order successfully.`;
      },
      error: (error: HttpErrorResponse) => {
        console.log('Failed to cancel an order.', error);
        this.errorMessage = `Failed to cancel an order. Status: ${error.status || 'unknown'}`;
      }
    });
  }
}
