import { IsString } from 'class-validator';

export class InfoDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  mail: string;

  @IsString()
  phone: string;

  @IsString()
  message: string;
}
