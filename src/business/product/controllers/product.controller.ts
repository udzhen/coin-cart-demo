import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ProductCreateService } from '../services/create-product.service';
import { ProductReceiveService } from '../services/receive-product.service';
import { ProductsReceiveService } from '../services/receive-products.service';
import { ProductRemoveService } from '../services/remove-product.service';
import { ProductUpdateService } from '../services/update-product.service';
import { ProductModel } from '../models/product.model';
import { ProductUpsertModel } from '../models/upsert-product.model';
import { ProductExistenceValidationPipe } from '../validators/product-existence.validation-pipe';

@Controller('product')
@ApiTags('Products')
export class ProductController {
  public constructor(
    private readonly productCreateService: ProductCreateService,
    private readonly productReceiveService: ProductReceiveService,
    private readonly productsReceiveService: ProductsReceiveService,
    private readonly productRemoveService: ProductRemoveService,
    private readonly productUpdateService: ProductUpdateService,
  ) { }

  @Post()
  @ApiOperation({
    operationId: 'create',
    summary: 'Creates new product',
  })
  @ApiCreatedResponse({
      description: 'Success create product response',
      type: ProductModel,
  })
  public async create(@Body() model: ProductUpsertModel): Promise<ProductModel> {
    return await this.productCreateService.create(model);
  }

  @Get('all')
  @ApiOperation({
    operationId: 'getAll',
    summary: 'Returns all products',
  })
  @ApiOkResponse({ type: ProductModel, isArray: true })
  public async getAll(): Promise<ProductModel[]> {
    return await this.productsReceiveService.getAll();
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'getById',
    summary: 'Returns product by id',
  })
  @ApiOkResponse({ type: ProductModel })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @UsePipes(ProductExistenceValidationPipe)
  public async getById(@Param('id') productId: number): Promise<ProductModel> {
    return await this.productReceiveService.getById(+productId);
  }

  @Patch(':id')
  @ApiOperation({
    operationId: 'update',
    summary: 'Updates product by id',
  })
  @ApiOkResponse({ type: ProductModel, isArray: true })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @UsePipes(ProductExistenceValidationPipe)
  public async update(@Param('id') productId: number, @Body() model: ProductUpsertModel): Promise<ProductModel> {
    return await this.productUpdateService.update(+productId, model);
  }

  @Delete(':id')
  @ApiOperation({
    operationId: 'remove',
    summary: 'Removes product by id',
  })
  @ApiOkResponse({ description: 'The product has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @UsePipes(ProductExistenceValidationPipe)
  public async remove(@Param('id') productId: number): Promise<void> {
    await this.productRemoveService.remove(+productId);
  }
}