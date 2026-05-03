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