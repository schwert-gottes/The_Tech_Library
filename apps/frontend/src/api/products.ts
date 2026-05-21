import { apiRequest } from "./client";
import { Product } from "../types/product";

export function fetchProducts(): Promise<Product[]> {
  return apiRequest<Product[]>("/products");
}
