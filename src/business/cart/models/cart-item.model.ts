import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from 'class-validator';

export class CartItemModel {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  public userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  public productId: number;
}