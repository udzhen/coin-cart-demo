import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserExistenceValidationService {
  public constructor(private readonly userRepository: UserRepository) { }

  public async throwIfUserDoesNotExist(userId: number): Promise<void> {
    const user = await this.userRepository.getById(userId)
    if (!user) {
      throw new HttpException(
        `User with ID ${userId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}