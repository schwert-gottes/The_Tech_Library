import { ConflictException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { describe, it, expect, beforeEach } from "vitest";
import { ProductsService } from "../products/products.service";
import { WishlistService } from "./wishlist.service";

describe("WishlistService", () => {
  let service: WishlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, WishlistService],
    }).compile();

    service = module.get<WishlistService>(WishlistService);
  });

  it("prevents duplicate wishlist items", () => {
    const first = service.addToWishlist(1);
    expect(first.id).toBe(1);

    expect(() => service.addToWishlist(1)).toThrow(ConflictException);
  });

  it("adds an item to the wishlist", () => {
    const item = service.addToWishlist(1);
    expect(item.id).toBe(1);
    expect(service.getWishlist()).toHaveLength(1);
  });

  it("removes an item from the wishlist", () => {
    service.addToWishlist(1);
    service.removeFromWishlist(1);
    expect(service.getWishlist()).toHaveLength(0);
  });

  it("throws NotFoundException when removing a non-existent item", () => {
    expect(() => service.removeFromWishlist(9999)).toThrow(NotFoundException);
  });
});
