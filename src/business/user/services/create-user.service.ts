import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserModelMapper } from '../mappers/user-model.mapper';
import { UserEntityMapper } from '../mappers/user-entity.mapper';
import { UserUpsertModel } from '../models/upsert-user.model';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserCreateService {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly userModelMapper: UserModelMapper,
    private readonly userEntityMapper: UserEntityMapper,
  ) { }

  public async create(model: UserUpsertModel): Promise<UserModel> {
    const entity = this.userEntityMapper.map(model);
    var user = await this.userRepository.save(entity);
    return this.userModelMapper.map(user);
  }
}