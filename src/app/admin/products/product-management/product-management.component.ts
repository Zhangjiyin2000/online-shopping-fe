import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminProductDetail, AdminProductRequest } from 'src/app/models/product.model';
import { AdminProductService } from 'src/app/services/admin-product.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent {
  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

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
  dataSource = new MatTableDataSource<AdminProductDetail>([]);
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
        this.dataSource.data = products;
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

}
