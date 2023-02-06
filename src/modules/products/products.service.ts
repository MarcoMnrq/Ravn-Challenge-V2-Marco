import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Product, Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * It creates a new product in the database
   * @param data - Prisma.ProductCreateInput
   * @returns A promise of a product
   */
  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<Product[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.product.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }): Promise<Product> {
    const { data, where } = params;
    return this.prisma.product.update({
      data,
      where,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
