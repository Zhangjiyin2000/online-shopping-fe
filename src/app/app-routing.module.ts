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
import { AdminOrderDetailComponent } from './admin/orders/order-detail/order-detail.component';
import { AdminProductDetailComponent } from './admin/products/product-detail/product-detail.component';
import { ProductManagementComponent } from './admin/products/product-management/product-management.component';
import { ProductFormComponent } from './admin/products/product-form/product-form.component';
import { OrderManagementComponent } from './admin/orders/order-management/order-management.component';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';

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
    component: HomeComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'orders/:id', 
    component: OrderDetailComponent,
    canActivate: [authGuard]
  },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
    canActivate: [authGuard]
  },
  {
    path: 'watchlist',
    component: WatchlistComponent,
    canActivate: [authGuard]
  },
  {
    path: 'watchlist/:id',
    component: WatchlistComponent,
    canActivate: [authGuard]
  },
  {
    path: 'cart',
    component: ShoppingCartComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin-home',
    component: AdminHomeComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin-home/:id',
    component: AdminHomeComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin/orders',
    component: OrderManagementComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin/orders/:id',
    component: AdminOrderDetailComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin/products',
    component: ProductManagementComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin/products/new',
    component: ProductFormComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin/products/:id/edit',
    component: ProductFormComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin/products/:id',
    component: AdminProductDetailComponent,
    canActivate: [authGuard, adminGuard]
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
