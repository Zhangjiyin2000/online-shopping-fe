import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProductService } from 'src/app/services/user-product.service';
import { UserProductDetail } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  userProductDetail: UserProductDetail | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
      private route: ActivatedRoute,
      private userProductService: UserProductService
    ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    if (!productId) {
      this.errorMessage = 'Invalid product id.';
      return;
    }

    this.loadUserProductDetail(productId);
  }
  
  loadUserProductDetail(productId: number): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.userProductService.getProductDetailById(productId).subscribe({
      next: (userProductDetail) => {
        this.userProductDetail = userProductDetail;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load user product detail', error);
        this.errorMessage = `Failed to load user product detail. Status: ${error.status || 'unknown'}`;
        this.isLoading = false;
      }
    });
  }
  

}
