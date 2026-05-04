import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserOrderService } from 'src/app/services/user-order.service';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;
  displayedColumns = ['productName', 'quantity', 'price', 'subtotal', 'actions'];
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private userOrderService: UserOrderService
  ) {}

  ngOnInit(): void {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));

    if (!orderId) {
      this.errorMessage = 'Invalid order id.';
      return;
    }

    this.loadOrder(orderId);
  }

  loadOrder(orderId: number): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.userOrderService.getOrderDetail(orderId).subscribe({
      next: (order) => {
        this.order = order;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load order detail', error);
        this.errorMessage = `Failed to load order detail. Status: ${error.status || 'unknown'}`;
        this.isLoading = false;
      }
    });
  }

  getOrderTotal(order: Order): number {
    return order.items.reduce((total, item) => {
      return total + item.quantity * item.purchasedPrice;
    }, 0);
  }

  cancelOrder(): void {
    if (!this.order) {
      return;
    }

    this.userOrderService.cancelOrder(this.order.orderId).subscribe({
      next: (updatedOrder) => {
        this.order = updatedOrder;
      },
      error: () => {
        this.errorMessage = 'Failed to cancel order.'
      }
    });
  }
}
