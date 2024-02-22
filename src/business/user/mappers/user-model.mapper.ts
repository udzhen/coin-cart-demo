import { Injectable } from '@nestjs/common';
import { UserModel } from '../models/user.model';
import { User } from '@prisma/client';

@Injectable()
export class UserModelMapper {
  public mapMany(users: User[]): UserModel[] {
    return users.map((u) => this.map(u));
  }

  public map(user: User): UserModel {
    return {
      id: user.id,
      name: user.name,
    };
  }
}