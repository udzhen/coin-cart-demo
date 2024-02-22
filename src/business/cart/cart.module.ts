import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CartController } from './controllers/cart.controller';
import { CartProductAddService } from './services/cart-product-add.service';
import { CartProductRemoveService } from './services/cart-product-remove.service';
import { CartProductsReceiveService } from './services/cart-products-receive.service';
import { CartItemExistenceValidationPipe } from './validators/cart-item-existence.validation-pipe';
import { CartItemNotExistsValidationPipe } from './validators/cart-item-not-exists.validation-pipe';
import { CartItemRepository } from './repository/cart-item.repository';
import { CartItemEntityMapper } from './mappers/cart-item-entity.mapper';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';
import { UserAndProductExistenceValidationPipe } from './validators/user-and-product-existence.validation-pipe';

@Module({
  imports: [DatabaseModule, UserModule, ProductModule],
  controllers: [CartController],
  providers: [
    // Pipes
    UserAndProductExistenceValidationPipe,
    CartItemExistenceValidationPipe,
    CartItemNotExistsValidationPipe,

    // Repositories
    CartItemRepository,

    // Services
    CartProductAddService,
    CartProductRemoveService,
    CartProductsReceiveService,

    // Mappers
    CartItemEntityMapper,
  ],
})
export class CartModule {}
