import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminProductDetail } from 'src/app/models/product.model';
import { AdminProductService } from 'src/app/services/admin-product.service';

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class AdminProductDetailComponent {
  product: AdminProductDetail | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
      private route: ActivatedRoute,
      private adminProductService: AdminProductService
    ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    if (!productId) {
      this.errorMessage = 'Invalid product id.';
      return;
    }

    this.loadAdminProductDetail(productId);
  }
  
  loadAdminProductDetail(productId: number): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.adminProductService.getProductDetailById(productId).subscribe({
      next: (product) => {
        this.product = product;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load admin product detail', error);
        this.errorMessage = `Failed to load admin product detail. Status: ${error.status || 'unknown'}`;
        this.isLoading = false;
      }
    });
  }
}
