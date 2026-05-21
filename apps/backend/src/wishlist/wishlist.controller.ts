import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { WishlistService } from "./wishlist.service";
import { CreateWishlistItemDto } from "./dto/create-wishlist-item.dto";
import type { Product } from "../common/types";

@Controller("wishlist")
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) { }

  @Get()
  getWishlist(): Product[] {
    return this.wishlistService.getWishlist();
  }

  @Post()
  addToWishlist(@Body() body: CreateWishlistItemDto): Product {
    return this.wishlistService.addToWishlist(body.productId);
  }

  @Delete(":id")
  removeFromWishlist(@Param("id", ParseIntPipe) id: number): { removed: true } {
    this.wishlistService.removeFromWishlist(id);
    return { removed: true };
  }
}
