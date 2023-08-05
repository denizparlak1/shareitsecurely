import { IsNumber, IsString } from 'class-validator';

export class ElasticlogDto {
  @IsString()
  readonly message: string;
  @IsNumber()
  readonly status: number;
  @IsString()
  readonly url: string;
  @IsString()
  readonly method: string;
}
