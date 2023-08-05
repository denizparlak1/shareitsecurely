import { IsNumber, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  password: string;
}
