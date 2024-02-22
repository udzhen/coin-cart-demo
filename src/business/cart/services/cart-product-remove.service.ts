import { Injectable } from '@nestjs/common';
import { CartItemModel } from '../models/cart-item.model';
import { CartItemRepository } from '../repository/cart-item.repository';

@Injectable()
export class CartProductRemoveService {
  public constructor(
    private readonly cartItemRepository: CartItemRepository,
  ) { }

  public async remove(model: CartItemModel): Promise<void> {
    await this.cartItemRepository.deleteByUserIdAndProductId(model.userId, model.productId);
  }
}