export interface PurchasedProductSummary {
  productId: number;
  name: string;
  totalQuantity: number;
}

export interface ProductProfitSummary {
  productId: number;
  name: string;
  totalProfit: number;
}
export interface RecentPurchasedSummary {
  productId: number;
  name: string;
  quantity: number;
  purchasedPrice: number;
  datePlaced: string;
}