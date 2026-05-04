export interface UserProductDetail {
  productId: number;
  name: string;
  description: string;
  retailPrice: number;
}

export interface AdminProductDetail extends UserProductDetail {
  wholesalePrice: number;
  quantity: number;
}

export interface AdminProductRequest {
  name: string;
  description: string;
  retailPrice: number;
  wholesalePrice: number;
  quantity: number;
}