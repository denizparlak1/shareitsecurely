import { IsNumber, IsOptional, IsString } from 'class-validator';

export class BaseUploadDto {
  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  is_deleted?: boolean;

  @IsOptional()
  @IsString()
  original_file_name?: string;
}
