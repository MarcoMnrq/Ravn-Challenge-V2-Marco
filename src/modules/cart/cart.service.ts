import { Injectable } from '@nestjs/common';
import { Cart } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { ProductsService } from '../products/products.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productsService: ProductsService,
  ) {}

  async addItem(userId: number, addCartItemDto: AddCartItemDto) {
    const cart = await this.retrieveUserCart(userId);
    const product = await this.productsService.findOneAndCheckAvailability(
      addCartItemDto.productId,
      addCartItemDto.quantity,
    );
    /* Check if item exists and it's available */
    const existingItem = await this.prisma.cartItem.findFirst({
      where: {
        productId: product.id,
        cartId: cart.id,
      },
    });
    if (existingItem) {
      /* Update quantity */
    }
    return this.prisma.cartItem.create({
      data: {
        cart: {
          connect: {
            id: cart.id,
          },
        },
        product: {
          connect: {
            id: product.id,
          },
        },
        quantity: addCartItemDto.quantity,
      },
    });
  }

  async getItems(userId: number) {
    const cart = await this.retrieveUserCart(userId);
    return this.prisma.cartItem.findMany({
      where: {
        cartId: cart.id,
      },
      include: {
        product: true,
      },
    });
  }

  updateItem(id: number, updateCartItemDto: UpdateCartItemDto) {
    return `This action updates a #${id} cart`;
  }

  removeItem(id: number) {
    return `This action removes a #${id} cart`;
  }

  async retrieveUserCart(userId: number): Promise<Cart> {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: true,
        user: true,
      },
    });
    if (!cart) {
      const newCart = await this.prisma.cart.create({
        data: {
          user: { connect: { id: userId } },
        },
        include: {
          items: true,
          user: true,
        },
      });
      return newCart;
    }
    return cart;
  }
}
