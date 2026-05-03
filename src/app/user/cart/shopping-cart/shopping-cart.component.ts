import { Component } from '@angular/core';
import { CartItem } from 'src/app/models/cart.model';
import { UserCartService } from 'src/app/services/user-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  cartItems: CartItem[] = [];
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

  constructor(private userCartService: UserCartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.isLoading = true;
    this.cartItems = this.userCartService.getAllCartItems();
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
