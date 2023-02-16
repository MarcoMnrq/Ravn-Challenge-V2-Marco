import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from '@prisma/client';
import { PrismaModule } from '../../database/prisma.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  describe('create', () => {
    it('should create a new order', async () => {
      const user = {
        id: 1,
        email: 'dummy@gmail.com',
        firstName: 'Jhon',
        lastName: 'Doe',
        password: '',
        roles: [UserRole.CLIENT],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const order = {
        id: 1,
        userId: 1,
        total: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
        items: [
          {
            id: 1,
            orderId: 1,
            productId: 1,
            price: 20,
            quantity: 1,
          },
        ],
      };
      jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve(order));

      expect(await controller.create(user)).toEqual(order);
    });
  });

  describe('create', () => {
    it('should create a new order', async () => {
      const user = {
        id: 1,
        email: 'dummy@gmail.com',
        firstName: 'Jhon',
        lastName: 'Doe',
        password: '',
        roles: [UserRole.CLIENT],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const order = {
        id: 1,
        userId: 1,
        total: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
        items: [
          {
            id: 1,
            orderId: 1,
            productId: 1,
            price: 20,
            quantity: 1,
          },
        ],
      };
      jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve(order));

      expect(await controller.create(user)).toEqual(order);
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
