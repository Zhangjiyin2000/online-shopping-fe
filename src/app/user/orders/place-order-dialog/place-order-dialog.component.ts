import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { UserOrderService } from 'src/app/services/user-order.service';

type OrderItemForm = FormGroup<{
  productId: FormControl<number | null>;
  quantity: FormControl<number | null>;
}>;

type OrderForm = FormGroup<{
  order: FormArray<OrderItemForm>;
}>;

@Component({
  selector: 'app-place-order-dialog',
  templateUrl: './place-order-dialog.component.html',
  styleUrls: ['./place-order-dialog.component.scss']
})
export class PlaceOrderDialogComponent {
  orderForm: OrderForm;

  isSubmitting = false;
  errorMessage = '';

  constructor(
    private dialogRef: MatDialogRef<PlaceOrderDialogComponent>,
    private fb: FormBuilder,
    private userOrderService: UserOrderService,
    private authService: AuthService
  ) {
    this.orderForm = this.fb.group({
      order: this.fb.array<OrderItemForm>([
        this.createOrderItem()
      ])
    });
  }

  get orderItems(): FormArray<OrderItemForm> {
    return this.orderForm.controls.order;
  }

  createOrderItem(): OrderItemForm {
    return this.fb.group({
      productId: [null as number | null, [Validators.required, Validators.min(1)]],
      quantity: [1 as number | null, [Validators.required, Validators.min(1)]]
    });
  }

  addOrderItem(): void {
    this.orderItems.push(this.createOrderItem());
  }

  removeOrderItem(index: number): void {
    if (this.orderItems.length === 1) {
      return;
    }

    this.orderItems.removeAt(index);
  }

  isProductIdInvalid(index: number): boolean {
    const control = this.orderItems.at(index).controls.productId;
    return control.invalid && (control.touched || control.dirty);
  }

  isQuantityInvalid(index: number): boolean {
    const control = this.orderItems.at(index).controls.quantity;
    return control.invalid && (control.touched || control.dirty);
  }

  placeOrder(): void {
    this.errorMessage = '';

    if (!this.authService.isUser() || this.authService.isAdmin()) {
      this.errorMessage = 'Only users can place orders.';
      return;
    }

    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }

    const payload = {
      order: this.orderForm.getRawValue().order.map(item => ({
        productId: Number(item.productId),
        quantity: Number(item.quantity)
      }))
    };

    this.isSubmitting = true;

    this.userOrderService.placeOrder(payload).subscribe({
      next: (order) => {
        this.dialogRef.close(order);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error?.message || `Failed to place order. Status: ${error.status || 'unknown'}`;
        this.isSubmitting = false;
      }
    });
  }
}
