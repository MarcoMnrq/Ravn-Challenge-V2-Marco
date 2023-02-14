import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
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
  async findAll() {
    return this.prisma.product.findMany();
  }

  async findAllPublic() {
    return this.prisma.product.findMany({
      where: {
        isVisible: true,
      },
    });
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
      throw new NotFoundException(`Product #${id} not found`);
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
    try {
      await this.findOne(id);
      const deletedProduct = await this.prisma.product.delete({
        where: {
          id: id,
        },
      });
      return deletedProduct;
    } catch (error) {
      if (error.message.includes('Foreign key constraint failed')) {
        throw new BadRequestException(
          'This product is referenced in one or more orders',
        );
      }
      throw error;
    }
  }

  /**
   * It finds a product by its ID, checks if it's visible, checks if it's in stock, and checks if the
   * requested quantity is available
   * @param {number} id - number - The id of the product we want to find.
   * @param {number} quantity - number - the quantity of the product that the user wants to buy
   * @returns A product
   */
  async findOneAndCheckAvailability(
    id: number,
    quantity: number,
  ): Promise<Product> {
    const product = await this.findOne(id);
    if (!product.isVisible) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    if (product.stock <= 0) {
      throw new BadRequestException(`Product #${id} is out of stock`);
    }
    if (product.stock < quantity) {
      throw new BadRequestException(
        `Invalid quantity, not enough stock for Product #${id}`,
      );
    }
    return product;
  }
}
