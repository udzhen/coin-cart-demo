import { ApiProperty } from "@nestjs/swagger";

export class ProductModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;
}