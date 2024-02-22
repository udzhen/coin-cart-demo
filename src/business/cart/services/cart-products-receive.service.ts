import { Injectable } from '@nestjs/common';
import { ProductModel } from 'src/business/product/models/product.model';
import { CartItemRepository } from '../repository/cart-item.repository';
import { ProductModelMapper } from 'src/business/product/mappers/product-model.mapper';

@Injectable()
export class CartProductsReceiveService {
  public constructor(
    private readonly productModelMapper: ProductModelMapper,
    private readonly cartItemRepository: CartItemRepository,
  ) { }

  public async receive(userId: number): Promise<ProductModel[]> {
    const cartItems = await this.cartItemRepository.getWithProductsByUserId(userId);
    const products = cartItems.map(cartItem => cartItem.product);
    return this.productModelMapper.mapMany(products);
  }
}