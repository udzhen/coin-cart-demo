import { Injectable } from '@nestjs/common';
import { UserModel } from '../models/user.model';
import { UserRepository } from '../repository/user.repository';
import { UserModelMapper } from '../mappers/user-model.mapper';

@Injectable()
export class UsersReceiveService {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly userModelMapper: UserModelMapper,
  ) { }
  
  public async getAll(): Promise<UserModel[]> {
    var users = await this.userRepository.getAll();
    return this.userModelMapper.mapMany(users);
  }
}