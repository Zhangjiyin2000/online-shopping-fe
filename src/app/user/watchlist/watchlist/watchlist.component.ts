import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProductDetail } from 'src/app/models/product.model';
import { UserWatchlistService } from 'src/app/services/user-watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent {
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
  userWatchlist: UserProductDetail[] = [];
  userWatchlistProduct: UserProductDetail | null = null;
  backRoute = '/home';
  backLabel = 'Back to Home';

  constructor(
    private route: ActivatedRoute,
    private userWatchlistService: UserWatchlistService) {}

  ngOnInit(): void {
    this.setBackLink();
    this.loadAllWatchlistProducts();
  }

  setBackLink(): void {
    const from = this.route.snapshot.queryParamMap.get('from');

    if (from === 'products') {
      this.backRoute = '/products';
      this.backLabel = 'Back to Products';
    }
  }

  loadAllWatchlistProducts(): void {
    this.userWatchlistService.getWatchlistProducts().subscribe({
      next: (userWatchlist) => {
        console.table(userWatchlist);
        this.userWatchlist = userWatchlist;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load user watchlist', error);
        this.errorMessage = `Failed to load user watchlist. Status: ${error.status || 'unknown'}`;
        this.isLoading = false;
      }
    })
  }

  deleteWatchlistByProductId(productId: number): void {
    this.userWatchlistService.removeProductFromWatchlist(productId).subscribe({
      next: () => {
        this.loadAllWatchlistProducts();
        // or instead of reloadingi from backend
        // this.userWatchlist = this.userWatchlist.filter(
        //   product => product.productId !== productId
        // );
        this.successMessage = `Product#${productId} removed from watchlist.`
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to remove product to watchlist', error);
        this.errorMessage = `Failed to remove product#${productId} to watchlist. Status: ${error.status || 'unknown'}`;
        this.isLoading = false;
      }
    })
  }
}
