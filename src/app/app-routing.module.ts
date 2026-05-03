import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './user/home/home.component';
import { OrderDetailComponent } from './user/orders/order-detail/order-detail.component';
import { ProductDetailComponent } from './user/products/product-detail/product-detail.component';
import { ProductListComponent } from './user/products/product-list/product-list.component';
import { WatchlistComponent } from './user/watchlist/watchlist/watchlist.component';
import { ShoppingCartComponent } from './user/cart/shopping-cart/shopping-cart.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';

const routes: Routes = [
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'register', 
    component: RegisterComponent
  },
  { 
    path: 'home', 
    component: HomeComponent 
  },
  { 
    path: 'orders/:id', 
    component: OrderDetailComponent 
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent
  },
  {
    path: 'watchlist',
    component: WatchlistComponent
  },
  {
    path: 'watchlist/:id',
    component: WatchlistComponent
  },
  {
    path: 'cart',
    component: ShoppingCartComponent
  },
  {
    path: 'admin-home',
    component: AdminHomeComponent
  },
  {
    path: 'admin-home/:id',
    component: AdminHomeComponent
  },
  {
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
