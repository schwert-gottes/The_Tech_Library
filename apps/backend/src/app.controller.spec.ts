import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { describe, it, expect, beforeEach } from "vitest";

describe("AppController", () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getStoreName", () => {
    it("should return the store name", () => {
      const result = controller.getStoreName();
      expect(result).toEqual({ name: "The Tech Library" });
    });
  });
});
