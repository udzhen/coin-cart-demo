import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserRepository } from './repository/user.repository';
import { UserController } from './controllers/user.controller';
import { UserExistenceValidationPipe } from './validators/user-existence.validation-pipe';
import { UserCreateService } from './services/create-user.service';
import { UserReceiveService } from './services/receive-user.service';
import { UsersReceiveService } from './services/receive-users.service';
import { UserRemoveService } from './services/remove-user.service';
import { UserUpdateService } from './services/update-user.service';
import { UserModelMapper } from './mappers/user-model.mapper';
import { UserEntityMapper } from './mappers/user-entity.mapper';
import { UserExistenceValidationService } from './validators/user-existence-validation.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    // Pipes
    UserExistenceValidationPipe,

    // Repositories
    UserRepository,

    // Services
    UserCreateService,
    UserReceiveService,
    UsersReceiveService,
    UserRemoveService,
    UserUpdateService,
    UserExistenceValidationService,

    // Mappers
    UserModelMapper,
    UserEntityMapper,
  ],
  exports: [UserExistenceValidationService],
})
export class UserModule {}
