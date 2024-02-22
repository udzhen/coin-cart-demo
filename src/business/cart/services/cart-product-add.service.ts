import { Injectable } from '@nestjs/common';
import { CartItemRepository } from '../repository/cart-item.repository';
import { CartItemModel } from '../models/cart-item.model';
import { CartItemEntityMapper } from '../mappers/cart-item-entity.mapper';

@Injectable()
export class CartProductAddService {
  public constructor(
    private readonly cartItemRepository: CartItemRepository,
    private readonly cartItemEntityMapper: CartItemEntityMapper,
  ) { }

  public async addProduct(model: CartItemModel): Promise<void> {
    const entity = this.cartItemEntityMapper.map(model);
    await this.cartItemRepository.save(entity);
  }
}