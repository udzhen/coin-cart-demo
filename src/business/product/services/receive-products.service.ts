import { Injectable } from '@nestjs/common';
import { ProductModel } from '../models/product.model';
import { ProductRepository } from '../repository/product.repository';
import { ProductModelMapper } from '../mappers/product-model.mapper';

@Injectable()
export class ProductsReceiveService {
  public constructor(
    private readonly productRepository: ProductRepository,
    private readonly productModelMapper: ProductModelMapper,
  ) { }
  
  public async getAll(): Promise<ProductModel[]> {
    var products = await this.productRepository.getAll();
    return this.productModelMapper.mapMany(products);
  }
}