import { IsInt, Min } from 'class-validator';

export class AddCartItemDto {
  @Min(1)
  @IsInt()
  productId: number;

  @Min(1)
  @IsInt()
  quantity: number;
}
