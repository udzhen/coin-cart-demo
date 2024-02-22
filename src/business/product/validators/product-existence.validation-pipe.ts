import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus, HttpException } from '@nestjs/common'
import { ProductRepository } from '../repository/product.repository'

@Injectable()
export class ProductExistenceValidationPipe implements PipeTransform {
  public constructor(
    private readonly productRepository: ProductRepository,
  ) { }

  public async transform(productId: string, metadata: ArgumentMetadata) {
    if (metadata.type === 'param') {
      const product = await this.productRepository.getById(+productId)
      if (!product) {
        throw new HttpException(
          `Product with ID ${productId} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
    }

    return productId;
  }
}