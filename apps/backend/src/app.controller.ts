import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("store-name")
  getStoreName(): { name: string } {
    return this.appService.getStoreName();
  }
}
