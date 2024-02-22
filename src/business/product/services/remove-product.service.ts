import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';

@Injectable()
export class ProductRemoveService {
  public constructor(private readonly productRepository: ProductRepository) { }

  public async remove(productId: number): Promise<void> {
    await this.productRepository.delete(productId);
  }
}