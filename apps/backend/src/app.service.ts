import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getStoreName(): { name: string } {
    return { name: "The Tech Library" };
  }
}
