import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart.model';
import { UserProductDetail } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class UserCartService {
  private storageKey = 'shoppingCart';

  constructor() { }

  getAllCartItems(): CartItem[] {
    const storedCart = localStorage.getItem(this.storageKey);
    console.log(storedCart);
    if (storedCart) {
      console.log(JSON.parse(storedCart));
    }
    return storedCart ? JSON.parse(storedCart) : [];
  }

  addProductToCart(product: UserProductDetail): void {
    const cartItems = this.getAllCartItems();

    const existingItem = cartItems.find(
      item => item.productId === product.productId
    )

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({
        productId: product.productId,
        name: product.name,
        description: product.description,
        retailPrice: product.retailPrice,
        quantity: 1
      })
    }

    console.log(cartItems);
    console.log(JSON.stringify(cartItems));

    localStorage.setItem(this.storageKey, JSON.stringify(cartItems));
  }

  removeProductFromCart(productId: number): void {
    const cartItems = this.getAllCartItems().filter(
      item => item.productId !== productId
    );

    localStorage.setItem(this.storageKey, JSON.stringify(cartItems));
  }

  clearCart(): void {
    localStorage.removeItem(this.storageKey);
  }
}
