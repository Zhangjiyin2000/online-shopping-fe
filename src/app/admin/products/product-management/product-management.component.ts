import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminProductDetail, AdminProductRequest } from 'src/app/models/product.model';
import { AdminProductService } from 'src/app/services/admin-product.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent {
  displayedColumns: string[] = [
    'productId',
    'name',
    'description',
    'retailPrice',
    'wholesalePrice',
    'quantity',
    'actions'
  ]
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  products: AdminProductDetail[] = [];
  product: AdminProductDetail | null = null;
  
  constructor(
    private adminProductService: AdminProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllProductForAdmin();
  }

  loadAllProductForAdmin(): void {
    this.adminProductService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load products for admin', error);
        this.errorMessage = `Failed to load products for admin. Status: ${error.status || 'unknown'}`;
        this.isLoading = false;
      }
    });
  }

  getProductDetailByIdForAdmin(productId: number): void {
    this.adminProductService.getProductDetailById(productId).subscribe({
      next: (product) => {
        this.product = product;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error(`Failed to load product #${productId} for admin`, error);
        this.errorMessage = `Failed to load product #${productId} for admin. Status: ${error.status || 'unknown'}`;
        this.isLoading = false;
      }
    });
  }

  EditProduct(productId: number, payload: AdminProductRequest) {
    this.adminProductService.updateProduct(productId, payload).subscribe({
      next: (product) => {
        this.product = product;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error(`Failed to update product #${productId} for admin`, error);
        this.errorMessage = `Failed to update product #${productId} for admin. Status: ${error.status || 'unknown'}`;
        this.isLoading = false;
      }
    });
  }

}
