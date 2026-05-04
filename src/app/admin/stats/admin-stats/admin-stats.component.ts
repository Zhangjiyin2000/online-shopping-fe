import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductProfitSummary, PurchasedProductSummary } from 'src/app/models/stats.model';
import { AdminStatsService } from 'src/app/services/admin-stats.service';

@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.component.html',
  styleUrls: ['./admin-stats.component.scss']
})
export class AdminStatsComponent {
  poplarProducts: PurchasedProductSummary[] = [];
  profitableProducts: ProductProfitSummary[] = [];
  errorMessage = '';

  constructor(private adminStatsService: AdminStatsService) {}

  ngOnInit(): void {
    this.loadTopProducts();
  }

  loadTopProducts(): void {
    this.errorMessage = '';

    this.adminStatsService.getMostPopularProducts(3).subscribe({
      next: (poplarProducts) => {
        this.poplarProducts = poplarProducts;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load popular products', error);
        this.errorMessage = `Failed to load top popular products. Status: ${error.status || 'unknown'}`;
      }
    });

    this.adminStatsService.getMostProfitableProducts(1).subscribe({
      next: (profitableProducts) => {
        this.profitableProducts = profitableProducts;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load profitable products', error);
        this.errorMessage = `Failed to load top profitable products. Status: ${error.status || 'unknown'}`;
      }
    });
  }
}
