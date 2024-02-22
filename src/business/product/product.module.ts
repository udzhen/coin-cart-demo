import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProductController } from './controllers/product.controller';
import { ProductCreateService } from './services/create-product.service';
import { ProductReceiveService } from './services/receive-product.service';
import { ProductsReceiveService } from './services/receive-products.service';
import { ProductRemoveService } from './services/remove-product.service';
import { ProductUpdateService } from './services/update-product.service';
import { ProductRepository } from './repository/product.repository';
import { ProductModelMapper } from './mappers/product-model.mapper';
import { ProductEntityMapper } from './mappers/product-entity.mapper';
import { ProductExistenceValidationPipe } from './validators/product-existence.validation-pipe';
import { ProductExistenceValidationService } from './validators/product-existence-validation.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [
    // Pipes
    ProductExistenceValidationPipe,

    // Repositories
    ProductRepository,

    // Services
    ProductCreateService,
    ProductReceiveService,
    ProductsReceiveService,
    ProductRemoveService,
    ProductUpdateService,
    ProductExistenceValidationService,

    // Mappers
    ProductModelMapper,
    ProductEntityMapper,
  ],
  exports: [
    ProductExistenceValidationService,
    ProductModelMapper,
  ],
})
export class ProductModule {}
