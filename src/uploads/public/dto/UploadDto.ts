import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UploadDto {
  @IsOptional()
  @IsString()
  url?: string;
  @IsOptional()
  @IsString()
  readonly email?: string;
  @IsOptional()
  @IsString()
  original_file_name?: string;
  @IsOptional()
  @IsString()
  uploaded_file_name?: string;
}
