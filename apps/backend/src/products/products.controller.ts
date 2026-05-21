import { Controller, Get, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { GetProductsQueryDto } from "./dto/get-products-query.dto";
import type { Product } from "../common/types";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  getProducts(@Query() query: GetProductsQueryDto): Product[] {
    return this.productsService.getProducts(query.type);
  }
}
