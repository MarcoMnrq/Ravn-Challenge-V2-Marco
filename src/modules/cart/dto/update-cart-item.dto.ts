import { IsInt, Min } from 'class-validator';

export class UpdateCartItemDto {
  @Min(1)
  @IsInt()
  quantity: number;
}
