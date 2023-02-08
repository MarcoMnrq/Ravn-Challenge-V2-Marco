import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * It creates a new product in the database using the Prisma client
   * @param {CreateProductDto} createProductDto - CreateProductDto
   * @returns The product that was created.
   */
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.prisma.product.create({
      data: {
        ...createProductDto,
      },
    });
    return product;
  }

  /**
   * It returns all the products from the database
   * @returns An array of products
   */
  findAll() {
    return this.prisma.product.findMany();
  }

  /**
   * It finds a product by its id, and if it doesn't exist, it throws an error
   * @param {number} id - number - The id of the product we want to find.
   * @returns The product with the id that was passed in.
   */
  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID: ${id} not found`);
    }
    return product;
  }

  /**
   * We first find the product by id, then we update the product with the new data
   * @param {number} id - number - The id of the product we want to update.
   * @param {UpdateProductDto} updateProductDto - UpdateProductDto
   * @returns The updated product.
   */
  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    const updatedProduct = await this.prisma.product.update({
      where: {
        id: id,
      },
      data: {
        ...updateProductDto,
      },
    });
    return updatedProduct;
  }

  /**
   * We first find the product by its id, then we delete it
   * @param {number} id - The id of the product to be deleted.
   * @returns The deleted product
   */
  async remove(id: number) {
    await this.findOne(id);
    const deletedProduct = await this.prisma.product.delete({
      where: {
        id: id,
      },
    });
    return deletedProduct;
  }
}
