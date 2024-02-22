import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';

@Injectable()
export class ProductExistenceValidationService {
  public constructor(private readonly productRepository: ProductRepository) { }

  public async throwIfProductDoesNotExist(productId: number): Promise<void> {
    const product = await this.productRepository.getById(productId)
    if (!product) {
      throw new HttpException(
        `Product with ID ${productId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}