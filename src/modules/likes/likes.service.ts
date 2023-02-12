import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Like } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { ProductsService } from '../products/products.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productsService: ProductsService,
  ) {}

  async create(userId: number, createLikeDto: CreateLikeDto): Promise<Like> {
    const existingWishlistItem = await this.prisma.like.findFirst({
      where: {
        productId: createLikeDto.productId,
        userId: userId,
      },
    });
    if (existingWishlistItem) {
      throw new BadRequestException(`Product is already in wishlist`);
    }
    const product = await this.productsService.findOne(createLikeDto.productId);
    return this.prisma.like.create({
      data: {
        product: {
          connect: {
            id: product.id,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async findAll(userId: number): Promise<Like[]> {
    const items = await this.prisma.like.findMany({
      where: {
        userId: userId,
      },
    });
    return items;
  }

  async findOne(userId: number, productId: number) {
    const wishlistItem = await this.prisma.like.findFirst({
      where: {
        productId: productId,
        userId: userId,
      },
    });
    if (!wishlistItem) {
      throw new NotFoundException(
        `Product #${productId} is not on user's liked products`,
      );
    }
    return wishlistItem;
  }

  async remove(userId: number, productId: number) {
    const existingItem = await this.findOne(userId, productId);
    return this.prisma.like.delete({
      where: {
        id: existingItem.id,
      },
    });
  }
}
