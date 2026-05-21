import { Test, TestingModule } from "@nestjs/testing";
import { describe, it, expect, beforeEach } from "vitest";
import { ProductsService } from "./products.service";

describe("ProductsService", () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it("returns all products", () => {
    const products = service.getProducts();
    expect(products.length).toBeGreaterThan(0);
  });

  it("filters products by type", () => {
    const products = service.getProducts("Books");
    expect(products.length).toBeGreaterThan(0);
    expect(products.every((product) => product.type === "Books")).toBe(true);
  });

  it("returns empty array for unknown type", () => {
    const products = service.getProducts("NonExistentCategory");
    expect(products).toEqual([]);
  });
});
