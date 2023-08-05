import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserBaseDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  id: number;
}
