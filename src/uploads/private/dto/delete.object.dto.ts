import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteObjectDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  original_file_name: string;
}
