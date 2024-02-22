import { Injectable } from '@nestjs/common';
import { ProductUpsertModel } from '../models/upsert-product.model';
import { ProductRepository } from '../repository/product.repository';
import { ProductEntityMapper } from '../mappers/product-entity.mapper';
import { ProductModelMapper } from '../mappers/product-model.mapper';
import { ProductModel } from '../models/product.model';

@Injectable()
export class ProductCreateService {
  public constructor(
    private readonly productRepository: ProductRepository,
    private readonly productModelMapper: ProductModelMapper,
    private readonly productEntityMapper: ProductEntityMapper,
  ) { }

  public async create(model: ProductUpsertModel): Promise<ProductModel> {
    const entity = this.productEntityMapper.map(model);
    var product = await this.productRepository.save(entity);
    return this.productModelMapper.map(product);
  }
}