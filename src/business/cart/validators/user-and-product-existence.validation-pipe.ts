import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'
import { CartItemModel } from '../models/cart-item.model';
import { UserExistenceValidationService } from 'src/business/user/validators/user-existence-validation.service';
import { ProductExistenceValidationService } from 'src/business/product/validators/product-existence-validation.service';

@Injectable()
export class UserAndProductExistenceValidationPipe implements PipeTransform {
  public constructor(
    private readonly userExistenceValidationService: UserExistenceValidationService,
    private readonly productExistenceValidationService: ProductExistenceValidationService,
  ) { }

  public async transform(model: CartItemModel, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      await this.productExistenceValidationService.throwIfProductDoesNotExist(model.productId);
      await this.userExistenceValidationService.throwIfUserDoesNotExist(model.userId);
    }

    return model;
  }
}