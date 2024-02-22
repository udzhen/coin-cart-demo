import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserUpsertModel } from '../models/upsert-user.model';

@Injectable()
export class UserEntityMapper {
  public map(model: UserUpsertModel): User {
    return <User>{
      ...model,
    };
  }
}