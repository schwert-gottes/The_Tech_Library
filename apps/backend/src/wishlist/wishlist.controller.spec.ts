import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { afterEach, beforeEach, describe, it } from "vitest";
import { AppModule } from "../app.module";

describe("WishlistController", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it("returns an empty wishlist on initial load", async () => {
    await request(app.getHttpServer()).get("/wishlist").expect(200).expect([]);
  });

  it("returns 400 for an invalid wishlist payload", async () => {
    await request(app.getHttpServer())
      .post("/wishlist")
      .send({ productId: 0 })
      .expect(400);
  });

  it("returns 409 when adding a duplicate wishlist item", async () => {
    await request(app.getHttpServer())
      .post("/wishlist")
      .send({ productId: 1 })
      .expect(201);

    await request(app.getHttpServer())
      .post("/wishlist")
      .send({ productId: 1 })
      .expect(409);
  });

  it("returns 404 when removing a missing wishlist item", async () => {
    await request(app.getHttpServer()).delete("/wishlist/9999").expect(404);
  });
});
