import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ProductsService } from "../products/products.service";
import { Product } from "../common/types";

@Injectable()
export class WishlistService {
  private wishlist: Product[] = [];

  constructor(private readonly productsService: ProductsService) { }

  getWishlist(): Product[] {
    return [...this.wishlist];
  }

  addToWishlist(productId: number): Product {
    const product = this.productsService.getProductById(productId);

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    const alreadyAdded = this.wishlist.some((item) => item.id === productId);

    if (alreadyAdded) {
      throw new ConflictException("Product already in wishlist");
    }

    this.wishlist = [...this.wishlist, product];
    return product;
  }

  removeFromWishlist(productId: number): void {
    const alreadyAdded = this.wishlist.some((item) => item.id === productId);

    if (!alreadyAdded) {
      throw new NotFoundException("Wishlist item not found");
    }

    this.wishlist = this.wishlist.filter((item) => item.id !== productId);
  }
}
