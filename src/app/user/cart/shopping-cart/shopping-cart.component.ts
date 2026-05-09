import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/models/cart.model';
import { UserCartService } from 'src/app/services/user-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  cartItems: CartItem[] = [];
  dataSource = new MatTableDataSource<CartItem>([]);
  displayedColumns = [
    'name',
    'quantity',
    'retailPrice',
    'subtotal',
    'action'
  ]
  successMessage = '';
  errorMessage = '';
  isLoading = false;
  backRoute = '/home';
  backLabel = 'Back to Home';

  constructor(
    private route: ActivatedRoute,
    private userCartService: UserCartService
  ) {}

  ngOnInit(): void {
    this.setBackLink();
    this.loadCartItems();
  }

  setBackLink(): void {
    const from = this.route.snapshot.queryParamMap.get('from');

    if (from === 'products') {
      this.backRoute = '/products';
      this.backLabel = 'Back to Products';
    }
  }

  loadCartItems(): void {
    this.isLoading = true;
    this.cartItems = this.userCartService.getAllCartItems();
    this.dataSource.data = this.cartItems;
    this.isLoading = false;
  }

  removeFromCart(productId: number): void {
    this.userCartService.removeProductFromCart(productId);
    this.successMessage = 'Removed product from shopping cart.'
    this.loadCartItems();
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + item.quantity * item.retailPrice;
    }, 0);
  }

}
