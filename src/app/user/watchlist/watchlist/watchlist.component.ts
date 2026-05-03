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
    errorMessage = '';
    userWatchlist: UserProductDetail[] = [];

    constructor(
      private route: ActivatedRoute,
      private userWatchlsitService: UserWatchlistService) {}

    ngOnInit(): void {
      this.loadAllWatchlistProducts();
    }

    loadAllWatchlistProducts(): void {
      this.userWatchlsitService.getWatchlistProducts().subscribe({
        next: (userWatchlist) => {
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
}
