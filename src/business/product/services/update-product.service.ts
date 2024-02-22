import { Injectable } from '@nestjs/common';
import { ProductUpsertModel } from '../models/upsert-product.model';
import { ProductRepository } from '../repository/product.repository';
import { ProductEntityMapper } from '../mappers/product-entity.mapper';
import { ProductModelMapper } from '../mappers/product-model.mapper';
import { ProductModel } from '../models/product.model';

@Injectable()
export class ProductUpdateService {
  public constructor(
    private readonly productRepository: ProductRepository,
    private readonly productModelMapper: ProductModelMapper,
    private readonly productEntityMapper: ProductEntityMapper,
  ) { }

  public async update(productId: number, model: ProductUpsertModel): Promise<ProductModel> {
    const entity = this.productEntityMapper.map(model);
    const product = await this.productRepository.update(productId, entity);
    return this.productModelMapper.map(product);
  }
}