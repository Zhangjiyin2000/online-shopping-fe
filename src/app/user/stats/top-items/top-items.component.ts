import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PurchasedProductSummary, RecentPurchasedSummary } from 'src/app/models/stats.model';
import { UserProductService} from 'src/app/services/user-product.service';
import { UserStatsService } from 'src/app/services/user-stats.service';

@Component({
  selector: 'app-top-items',
  templateUrl: './top-items.component.html',
  styleUrls: ['./top-items.component.scss']
})
export class TopItemsComponent implements OnInit {
  frequentProducts: PurchasedProductSummary[] = [];
  recentProducts: RecentPurchasedSummary[] = [];
  errorMessage = '';

  constructor(private userStatsService: UserStatsService) {}

  ngOnInit(): void {
    this.loadTopProducts();
  }

  loadTopProducts(): void {
    this.errorMessage = '';

    this.userStatsService.getMostFrequentlyPurchasedProducts(3).subscribe({
      next: (frequentProducts) => {
        this.frequentProducts = frequentProducts;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load frequent products', error);
        this.errorMessage = `Failed to load top frequent products. Status: ${error.status || 'unknown'}`;
      }
    });

    this.userStatsService.getMostRecentlyPurchasedProducts(3).subscribe({
      next: (recentProducts) => {
        this.recentProducts = recentProducts;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load recent products', error);
        this.errorMessage = `Failed to load top recent products. Status: ${error.status || 'unknown'}`;
      }
    });
  }

}
