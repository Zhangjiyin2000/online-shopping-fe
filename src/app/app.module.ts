import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './user/home/home.component';
import { OrderDetailComponent } from './user/orders/order-detail/order-detail.component';
import { TopItemsComponent } from './user/stats/top-items/top-items.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ProductDetailComponent } from './user/products/product-detail/product-detail.component';
import { ProductListComponent } from './user/products/product-list/product-list.component';
import { WatchlistComponent } from './user/watchlist/watchlist/watchlist.component';
import { ShoppingCartComponent } from './user/cart/shopping-cart/shopping-cart.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminStatsComponent } from './admin/stats/admin-stats/admin-stats.component';
import { ProductManagementComponent } from './admin/products/product-management/product-management.component';
import { ProductFormComponent } from './admin/products/product-form/product-form.component';
import { OrderManagementComponent } from './admin/orders/order-management/order-management.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    OrderDetailComponent,
    TopItemsComponent,
    ProductDetailComponent,
    ProductListComponent,
    WatchlistComponent,
    ShoppingCartComponent,
    AdminHomeComponent,
    AdminStatsComponent,
    ProductManagementComponent,
    ProductFormComponent,
    OrderManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
