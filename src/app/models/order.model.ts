export interface OrderItem {
  itemId: number;
  productId: number;
  productName: string;
  quantity: number;
  purchasedPrice: number;
}

export interface Order {
  orderId: number;
  datePlaced: string;
  orderStatus: string;
  items: OrderItem[];
}

export interface AdminOrderItem extends OrderItem {
    wholesalePrice: number;
}

export interface AdminOrder extends Order {
    userId: number;
    username: string;
    items: AdminOrderItem[];
}

export interface AdminOrderPage {
    page: number;
    pageSize: number;
    orders: AdminOrder[];
    totalOrders: number;
    totalPages: number;
}
