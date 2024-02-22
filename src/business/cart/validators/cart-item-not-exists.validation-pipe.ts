import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus, HttpException } from '@nestjs/common'
import { CartItemModel } from '../models/cart-item.model';
import { CartItemRepository } from '../repository/cart-item.repository';

@Injectable()
export class CartItemNotExistsValidationPipe implements PipeTransform {
  public constructor(private readonly cartItemRepository: CartItemRepository) { }

  public async transform(model: CartItemModel, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      const cartItem = await this.cartItemRepository.getByUserIdAndProductId(model.userId, model.productId);
      if (cartItem) {
        throw new HttpException('Cart item already exists', HttpStatus.BAD_REQUEST);
      }
    }

    return model;
  }
}