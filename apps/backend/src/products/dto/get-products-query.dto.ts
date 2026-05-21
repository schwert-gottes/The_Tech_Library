import { IsOptional, IsString } from "class-validator";

export class GetProductsQueryDto {
  @IsOptional()
  @IsString()
  type?: string;
}
