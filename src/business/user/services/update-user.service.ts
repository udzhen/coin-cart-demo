import { Injectable } from '@nestjs/common';
import { UserUpsertModel } from '../models/upsert-user.model';
import { UserRepository } from '../repository/user.repository';
import { UserModel } from '../models/user.model';
import { UserModelMapper } from '../mappers/user-model.mapper';
import { UserEntityMapper } from '../mappers/user-entity.mapper';

@Injectable()
export class UserUpdateService {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly userModelMapper: UserModelMapper,
    private readonly userEntityMapper: UserEntityMapper,
  ) { }

  public async update(userId: number, model: UserUpsertModel): Promise<UserModel> {
    const entity = this.userEntityMapper.map(model);
    const user = await this.userRepository.update(userId, entity);
    return this.userModelMapper.map(user);
  }
}