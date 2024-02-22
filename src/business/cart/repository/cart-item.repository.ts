import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CartItem } from '@prisma/client';
import { CartItemEntity } from '../entities/cart-item.entity';

@Injectable()
export class CartItemRepository {
  public constructor(private readonly database: DatabaseService) { }

  public async save(cartItem: CartItem): Promise<void> {
    await this.database.cartItem.create({ data: cartItem });
  }

  public async deleteByUserIdAndProductId(userId: number, productId: number): Promise<void> {
    await this.database.cartItem.deleteMany({
      where: {
        userId: userId,
        productId: productId,
      },
    });
  }

  public async getByUserIdAndProductId(userId: number, productId: number): Promise<CartItem> {
    return await this.database.cartItem.findFirst({
      where: {
        userId: userId,
        productId: productId,
      },
    });
  }

  public async getWithProductsByUserId(userId: number): Promise<CartItemEntity[]> {
    return await this.database.cartItem.findMany({
      where: {
        userId: userId,
      },
      include: {
        product: true,
      },
    });
  }
}