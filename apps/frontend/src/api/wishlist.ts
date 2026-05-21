import { apiRequest } from "./client";
import { Product } from "../types/product";

export function fetchWishlist(): Promise<Product[]> {
  return apiRequest<Product[]>("/wishlist");
}

export function addWishlistItem(productId: number): Promise<Product> {
  return apiRequest<Product>("/wishlist", {
    method: "POST",
    body: JSON.stringify({ productId }),
  });
}

export function removeWishlistItem(
  productId: number,
): Promise<{ removed: true }> {
  return apiRequest<{ removed: true }>(`/wishlist/${productId}`, {
    method: "DELETE",
  });
}
