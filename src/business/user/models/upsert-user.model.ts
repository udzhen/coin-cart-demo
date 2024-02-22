import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from 'class-validator';
import { isNotWhiteSpace } from "src/validation/is-not-white-space.validation.decorator";

export class UserUpsertModel {
  @ApiProperty()
  @IsNotEmpty()
  @isNotWhiteSpace('name')
  @IsString()
  name: string;
}