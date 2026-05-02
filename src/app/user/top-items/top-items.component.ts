import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService, PurchasedProductSummary } from 'src/app/services/product.service';

@Component({
  selector: 'app-top-items',
  templateUrl: './top-items.component.html',
  styleUrls: ['./top-items.component.scss']
})
export class TopItemsComponent implements OnInit {
  frequentProducts: PurchasedProductSummary[] = [];
  recentProducts: PurchasedProductSummary[] = [];
  errorMessage = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadTopProducts();
  }

  loadTopProducts(): void {
    this.errorMessage = '';

    this.productService.getMostFrequentlyPurchasedProducts(3).subscribe({
      next: (products) => {
        this.frequentProducts = products;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load frequent products', error);
        this.errorMessage = `Failed to load top products. Status: ${error.status || 'unknown'}`;
      }
    });

    this.productService.getMostRecentlyPurchasedProducts(3).subscribe({
      next: (products) => {
        this.recentProducts = products;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load recent products', error);
        this.errorMessage = `Failed to load top products. Status: ${error.status || 'unknown'}`;
      }
    });
  }

}
