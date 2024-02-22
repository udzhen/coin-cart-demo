import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiOkResponse } from '@nestjs/swagger';
import { ProductModel } from 'src/business/product/models/product.model';
import { UserAndProductExistenceValidationPipe } from '../validators/user-and-product-existence.validation-pipe';
import { CartProductAddService } from '../services/cart-product-add.service';
import { CartProductRemoveService } from '../services/cart-product-remove.service';
import { CartProductsReceiveService } from '../services/cart-products-receive.service';
import { CartItemModel } from '../models/cart-item.model';
import { UserExistenceValidationPipe } from 'src/business/user/validators/user-existence.validation-pipe';
import { CartItemNotExistsValidationPipe } from '../validators/cart-item-not-exists.validation-pipe';
import { CartItemExistenceValidationPipe } from '../validators/cart-item-existence.validation-pipe';

@Controller('cart')
@ApiTags('Cart')
export class CartController {
  public constructor(
    private readonly cartProductAddService: CartProductAddService,
    private readonly cartProductRemoveService: CartProductRemoveService,
    private readonly cartProductsReceiveService: CartProductsReceiveService,
  ) { }

  @Post('add-product')
  @ApiOperation({
    operationId: 'add',
    summary: 'Adds product to user cart',
  })
  @ApiOkResponse({ description: 'The item been successfully added.' })
  @ApiNotFoundResponse({ description: 'product or user not found' })
  @ApiBadRequestResponse({ description: 'Cart item already added' })
  @UsePipes(UserAndProductExistenceValidationPipe, CartItemNotExistsValidationPipe)
  public async add(@Body() model: CartItemModel): Promise<void> {
    await this.cartProductAddService.addProduct(model);
  }

  @Delete('remove-product')
  @ApiOperation({
    operationId: 'remove',
    summary: 'Removes product from user cart',
  })
  @ApiOkResponse({ description: 'The product has been successfully remove from user cart.' })
  @ApiNotFoundResponse({ description: 'product or user or cart item not found' })
  @UsePipes(UserAndProductExistenceValidationPipe, CartItemExistenceValidationPipe)
  public async remove(@Body() model: CartItemModel): Promise<void> {
    this.cartProductRemoveService.remove(model);
  }

  @Get(':userId/products')
  @ApiOperation({
    operationId: 'getById',
    summary: 'Returns user cart products by user id',
  })
  @ApiOkResponse({ type: ProductModel, isArray: true, description: 'The user cart products.'})
  @ApiNotFoundResponse({ description: 'User not found' })
  @UsePipes(UserExistenceValidationPipe)
  public async getById(@Param('userId') userId: number): Promise<ProductModel[]> {
    return await this.cartProductsReceiveService.receive(+userId);
  }
}