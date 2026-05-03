import { Component } from '@angular/core';
import { UserProductService } from 'src/app/services/user-product.service';
import { UserProductDetail } from 'src/app/models/product.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  displayedColumns: string[] = [
    'productId',
    'name',
    'description',
    'retailPrice',
    'actions'
  ]
  isLoading = false;
  errorMessage = '';
  userProductDetailList: UserProductDetail[] = [];
  
  constructor(private userProductService: UserProductService) {}

  ngOnInit(): void {
    this.loadAllUserProduct();
  }

  loadAllUserProduct(): void {
    this.userProductService.getAllProducts().subscribe({
      next: (userProductDetailList) => {
        this.userProductDetailList = userProductDetailList;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load user product detail list', error);
        this.errorMessage = `Failed to load user product detail list. Status: ${error.status || 'unknown'}`;
        this.isLoading = false;
      }
    });
  }
  
}
