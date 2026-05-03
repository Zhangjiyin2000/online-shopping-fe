import { Component } from '@angular/core';
import { UserProductService } from 'src/app/services/user-product.service';
import { UserProductDetail } from 'src/app/models/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UserWatchlistService } from 'src/app/services/user-watchlist.service';
import { Router } from '@angular/router';
import { UserCartService } from 'src/app/services/user-cart.service';

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
  successMessage = '';
  errorMessage = '';
  userProductDetailList: UserProductDetail[] = [];
  userWatchlistProduct: UserProductDetail | null = null;
  
  constructor(
    private userProductService: UserProductService,
    private userWatchlistService: UserWatchlistService,
    private router: Router,
    private userCartService: UserCartService
  ) {}

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

  addWatchlistByProductId(productId: number): void {
      this.userWatchlistService.addProductToWatchlist(productId).subscribe({
        next: () => {
          this.router.navigate(['/watchlist']);
          this.successMessage = 'Product added to watchlist.';
          this.isLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Failed to add product to watchlist', error);
          this.errorMessage = `Failed to add product to watchlist. Status: ${error.status || 'unknown'}`;
          this.isLoading = false;
        }
      })
    }

    deleteWatchlistByProductId(productId: number): void {
      this.userWatchlistService.removeProductFromWatchlist(productId).subscribe({
        next: () => {
          this.loadAllUserProduct();
          this.isLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Failed to remove product to watchlist', error);
          this.errorMessage = `Failed to remove product to watchlist. Status: ${error.status || 'unknown'}`;
          this.isLoading = false;
        }
      })
    }

    addToCart(product: UserProductDetail): void {
      this.userCartService.addProductToCart(product);
      this.successMessage = 'Product added to shopping cart.';
    }
  
}
