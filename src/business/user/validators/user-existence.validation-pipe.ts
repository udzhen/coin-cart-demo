import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus, HttpException } from '@nestjs/common'
import { UserExistenceValidationService } from './user-existence-validation.service';

@Injectable()
export class UserExistenceValidationPipe implements PipeTransform {
  public constructor(
    private readonly userExistenceValidationService: UserExistenceValidationService,
  ) { }

  public async transform(userId: string, metadata: ArgumentMetadata) {
    if (metadata.type === 'param') {
      await this.userExistenceValidationService.throwIfUserDoesNotExist(+userId)
    }

    return userId;
  }
}