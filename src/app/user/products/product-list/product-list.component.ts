import { Component, ViewChild } from '@angular/core';
import { UserProductService } from 'src/app/services/user-product.service';
import { UserProductDetail } from 'src/app/models/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UserWatchlistService } from 'src/app/services/user-watchlist.service';
import { Router } from '@angular/router';
import { UserCartService } from 'src/app/services/user-cart.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { PlaceOrderDialogComponent } from '../../orders/place-order-dialog/place-order-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

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
  dataSource = new MatTableDataSource<UserProductDetail>([]);
  userWatchlistProduct: UserProductDetail | null = null;
  
  constructor(
    private userProductService: UserProductService,
    private userWatchlistService: UserWatchlistService,
    private router: Router,
    private userCartService: UserCartService,
    private dialog: MatDialog,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAllUserProduct();
  }

  loadAllUserProduct(): void {
    this.userProductService.getAllProducts().subscribe({
      next: (userProductDetailList) => {
        this.userProductDetailList = userProductDetailList;
        this.dataSource.data = userProductDetailList;
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
          this.router.navigate(['/watchlist'], { queryParams: { from: 'products' } });
          this.successMessage = `Product#${productId} added to watchlist.`;
          this.isLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Failed to add product to watchlist', error);
          this.errorMessage = `Failed to add product#${productId} to watchlist. Status: ${error.status || 'unknown'}`;
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
    this.showSuccessMessage(`Product#${product.productId} added to shopping cart.`);
    this.router.navigate(['/cart'], { queryParams: { from: 'products' } });
  }

  openPlaceOrderDialog(): void {
    if (!this.authService.isUser() || this.authService.isAdmin()) {
      this.errorMessage = 'Only users can place orders.';
      return;
    }

    const dialogRef = this.dialog.open(PlaceOrderDialogComponent, {
      width: '720px'
    });

    dialogRef.afterClosed().subscribe((order) => {
      if (order) {
        this.showSuccessMessage(`Placed order #${order.orderId} successfully.`);
      }
    });
  }

  private showSuccessMessage(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }
  
}
