import { IsString, IsInt, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  imageUrl: string;

  @IsString()
  category: string;

  @IsNumber()
  price: number;

  @IsInt()
  stock: number;
}
