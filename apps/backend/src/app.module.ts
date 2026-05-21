import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RequestLoggerMiddleware } from "./common/request-logger.middleware";
import { ProductsModule } from "./products/products.module";
import { WishlistModule } from "./wishlist/wishlist.module";

@Module({
  imports: [ProductsModule, WishlistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes("*");
  }
}
