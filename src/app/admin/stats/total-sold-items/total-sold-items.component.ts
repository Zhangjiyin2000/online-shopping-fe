import { Component } from '@angular/core';
import { AdminOrderService } from 'src/app/services/admin-order.service';

@Component({
  selector: 'app-total-sold-items',
  templateUrl: './total-sold-items.component.html',
  styleUrls: ['./total-sold-items.component.scss']
})
export class TotalSoldItemsComponent {
  totalSoldItems = 0;
  errorMessage = '';

  constructor(private adminOrderService: AdminOrderService) {}

  ngOnInit(): void {
    this.loadTotalSoldItems();
  }

  loadTotalSoldItems(): void {
    this.adminOrderService.getAllOrders().subscribe({
      next: (orders) => {
        this.totalSoldItems = orders
          .filter(order => order.orderStatus === 'Completed')
          .flatMap(order => order.items)
          .reduce((total, item) => total + item.quantity, 0);
      },
      error: (error) => {
        this.errorMessage = `Failed to load total sold items. Status: ${error.status || 'unknown'}`;
      }
    });
  }

}
