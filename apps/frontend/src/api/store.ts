import { apiRequest } from "./client";

export interface StoreNameResponse {
  name: string;
}

export function fetchStoreName(): Promise<StoreNameResponse> {
  return apiRequest<StoreNameResponse>("/store-name");
}
