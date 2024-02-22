import { Injectable } from '@nestjs/common';
import { CartItem, User } from '@prisma/client';
import { CartItemModel } from '../models/cart-item.model';

@Injectable()
export class CartItemEntityMapper {
  public map(model: CartItemModel): CartItem {
    return <CartItemModel>{
      ...model,
    };
  }
}