import { Injectable } from '@nestjs/common';
import { ProductModel } from '../models/product.model';
import { ProductRepository } from '../repository/product.repository';
import { ProductModelMapper } from '../mappers/product-model.mapper';

@Injectable()
export class ProductReceiveService {
  public constructor(
    private readonly productRepository: ProductRepository,
    private readonly productModelMapper: ProductModelMapper,
  ) { }

  public async getById(productId: number): Promise<ProductModel> {
    var products = await this.productRepository.getById(productId);
    return this.productModelMapper.map(products);
  }
}