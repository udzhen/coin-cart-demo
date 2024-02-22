import { Product } from "@prisma/client";

export class CartItemEntity {
  public userId: number;

  public productId: number;

  public product: Product;
}