import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../database/prisma.module';
import { ProductsModule } from '../products/products.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

describe('CartController', () => {
  let controller: CartController;
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ProductsModule],
      controllers: [CartController],
      providers: [CartService],
    }).compile();

    controller = module.get<CartController>(CartController);
    service = module.get<CartService>(CartService);
  });

  describe('create', () => {
    it('should add a product to the user cart', async () => {
      // TODO
    });
  });

  describe('findAll', () => {
    it('should return all the items in the user cart', async () => {
      // TODO
    });
  });

  describe('update', () => {
    it('should update the quantity of an item in the user cart', async () => {
      // TODO
    });
  });

  describe('remove', () => {
    it('should remove an item from the user cart', async () => {
      // TODO
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
