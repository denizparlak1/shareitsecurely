import { UpdateUserBaseDto } from './update.user.base.dto';
import { IsString } from 'class-validator';

export class UpdateMailDto {
  @IsString()
  mail: string;
}
