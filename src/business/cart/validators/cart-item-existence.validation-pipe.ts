import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common'
import { CartItemRepository } from '../repository/cart-item.repository';
import { CartItemModel } from '../models/cart-item.model';

@Injectable()
export class CartItemExistenceValidationPipe implements PipeTransform {
  public constructor(private readonly cartItemRepository: CartItemRepository) { }

  public async transform(model: CartItemModel, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      const cartItem = await this.cartItemRepository.getByUserIdAndProductId(model.userId, model.productId);
      if (!cartItem) {
        throw new HttpException('Cart item not found', HttpStatus.NOT_FOUND);
      }
    }

    return model;
  }
}