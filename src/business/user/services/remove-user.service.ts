import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserRemoveService {
  public constructor(private readonly userRepository: UserRepository) { }

  public async remove(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }
}