import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class PrivateLinkDto {
  @IsOptional()
  @IsString()
  url?: string;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  ttl: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  user_id: number;

  @IsOptional()
  @IsNumber()
  size?: number;

  @IsOptional()
  @IsString()
  original_file_name?: string;
}
