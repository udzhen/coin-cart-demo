import { Injectable } from '@nestjs/common';
import { UserModel } from '../models/user.model';
import { UserRepository } from '../repository/user.repository';
import { UserModelMapper } from '../mappers/user-model.mapper';

@Injectable()
export class UserReceiveService {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly userModelMapper: UserModelMapper,
  ) { }

  public async getById(userId: number): Promise<UserModel> {
    var users = await this.userRepository.getById(userId);
    return this.userModelMapper.map(users);
  }
}