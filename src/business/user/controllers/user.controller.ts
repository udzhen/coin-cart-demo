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
import { UserCreateService } from '../services/create-user.service';
import { UserReceiveService } from '../services/receive-user.service';
import { UsersReceiveService } from '../services/receive-users.service';
import { UserRemoveService } from '../services/remove-user.service';
import { UserUpdateService } from '../services/update-user.service';
import { UserModel } from '../models/user.model';
import { UserUpsertModel } from '../models/upsert-user.model';
import { UserExistenceValidationPipe } from '../validators/user-existence.validation-pipe';

@Controller('user')
@ApiTags('Users')
export class UserController {
  public constructor(
    private readonly userCreateService: UserCreateService,
    private readonly userReceiveService: UserReceiveService,
    private readonly usersReceiveService: UsersReceiveService,
    private readonly userRemoveService: UserRemoveService,
    private readonly userUpdateService: UserUpdateService,
  ) { }

  @Post()
  @ApiOperation({
    operationId: 'create',
    summary: 'Creates new user',
  })
  @ApiCreatedResponse({
      description: 'Success create user response',
      type: UserModel,
  })
  public async create(@Body() model: UserUpsertModel): Promise<UserModel> {
    return await this.userCreateService.create(model);
  }

  @Get('all')
  @ApiOperation({
    operationId: 'getAll',
    summary: 'Returns all users',
  })
  @ApiOkResponse({ type: UserModel, isArray: true })
  public async getAll(): Promise<UserModel[]> {
    return await this.usersReceiveService.getAll();
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'getById',
    summary: 'Returns user by id',
  })
  @ApiOkResponse({ type: UserModel })
  @ApiNotFoundResponse({ description: 'User not found' })
  @UsePipes(UserExistenceValidationPipe)
  public async getById(@Param('id') userId: number): Promise<UserModel> {
    return await this.userReceiveService.getById(+userId);
  }

  @Patch(':id')
  @ApiOperation({
    operationId: 'update',
    summary: 'Updates user by id',
  })
  @ApiOkResponse({ type: UserModel, isArray: true })
  @ApiNotFoundResponse({ description: 'User not found' })
  @UsePipes(UserExistenceValidationPipe)
  public async update(@Param('id') userId: number, @Body() model: UserUpsertModel): Promise<UserModel> {
    return await this.userUpdateService.update(+userId, model);
  }

  @Delete(':id')
  @ApiOperation({
    operationId: 'remove',
    summary: 'Removes user by id',
  })
  @ApiOkResponse({ description: 'The user has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'user not found' })
  @UsePipes(UserExistenceValidationPipe)
  public async remove(@Param('id') userId: number): Promise<void> {
    await this.userRemoveService.remove(+userId);
  }
}