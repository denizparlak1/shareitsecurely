import { BaseUploadDto } from '../../base/dto/baseUploadDto';
import { IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from 'class-transformer';

export class PrivateUploadDto extends BaseUploadDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  ttl: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  user_id: number;

  @IsOptional()
  @IsString()
  uploaded_file_name?: string;

  @IsOptional()
  @IsNumber()
  size?: number;
}
