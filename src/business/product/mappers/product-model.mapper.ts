import { Injectable } from '@nestjs/common';
import { ProductModel } from '../models/product.model';
import { Product } from '@prisma/client';

@Injectable()
export class ProductModelMapper {
  public mapMany(products: Product[]): ProductModel[] {
    return products.map((p) => this.map(p));
  }

  public map(product: Product): ProductModel {
    return {
      id: product.id,
      title: product.title,
    };
  }
}