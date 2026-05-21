import { Injectable } from "@nestjs/common";
import productsData from "../data/products.json";
import { Product } from "../common/types";

@Injectable()
export class ProductsService {
  private readonly products: Product[] = productsData as Product[];

  getProducts(type?: string): Product[] {
    if (!type) {
      return this.products;
    }

    return this.products.filter((product) => product.type === type);
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }
}
