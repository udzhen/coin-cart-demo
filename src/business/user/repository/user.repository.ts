import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  public constructor(private readonly database: DatabaseService) { }

  public async save(user: User): Promise<User> {
    return await this.database.user.create({ data: user });
  }

  public async getAll(): Promise<User[]> {
    return await this.database.user.findMany();
  }

  public async getById(id: number): Promise<User> {
    return await this.database.user.findUnique({ where: { id: id } });
  }

  public async update(userId: number, user: User): Promise<User> {
    return await this.database.user.update({
      where: { id: userId },
      data: user,
    });
  }

  public async delete(id: number): Promise<void> {
    await this.database.user.delete({ where: { id: id } });
  }
}