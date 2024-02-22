import { Injectable } from '@nestjs/common';
import { ProductUpsertModel } from '../models/upsert-product.model';
import { Product } from '@prisma/client';

@Injectable()
export class ProductEntityMapper {
  public map(model: ProductUpsertModel): Product {
    return <Product>{
      ...model,
    };
  }
}