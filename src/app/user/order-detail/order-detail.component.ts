import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
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

    this.orderService.getOrderDetail(orderId).subscribe({
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
}
