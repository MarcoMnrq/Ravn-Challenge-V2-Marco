import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CartService } from '../cart/cart.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cartService: CartService,
  ) {}

  async create(userId: number) {
    const cart = await this.cartService.getItems(userId);
    if (cart.meta.totalItems === 0) {
      throw new BadRequestException('Your cart is empty');
    }
    const orderItems = cart.items.map((item) => ({
      quantity: item.quantity,
      price: item.product.price,
      product: {
        connect: {
          id: item.product.id,
        },
      },
    }));
    const order = await this.prisma.order.create({
      data: {
        total: cart.meta.totalPrice,
        items: {
          create: orderItems,
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        items: true,
      },
    });
    await this.cartService.clearCart(userId);
    return order;
  }

  findAll(userId?: number) {
    const whereClause = userId ? { userId } : {};
    console.log(whereClause);
    return this.prisma.order.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }
}
