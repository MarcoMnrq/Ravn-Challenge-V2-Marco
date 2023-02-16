import { IsNumber, Min, Max } from 'class-validator';

export class PaginationQueryDto {
  @IsNumber()
  @Min(1)
  @Max(50)
  limit: number;

  @IsNumber()
  @Min(1)
  page: number;
}
