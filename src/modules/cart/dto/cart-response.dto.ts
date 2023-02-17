import { CartItem } from '@prisma/client';

export class CartResponseDto {
  items: CartItem[];

  totalItems: number;

  totalPrice: number;

  constructor(items: CartItem[]) {
    this.items = items;
    this.totalItems = items.length;
  }
}
