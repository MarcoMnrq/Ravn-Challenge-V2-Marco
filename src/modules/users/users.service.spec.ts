import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient, User } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();
    service = module.get<UsersService>(UsersService);
    prisma = module.get(PrismaService);
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'jhon.doe@gmail.com',
        firstName: 'Jhon',
        lastName: 'Doe',
        password: 'jhondoe',
      };

      const newProduct: User = {
        id: 1,
        name: createProductDto.name,
        description: createProductDto.description,
        category: createProductDto.category,
        price: createProductDto.price,
        stock: createProductDto.stock,
        isVisible: createProductDto.isVisible,
        imageUrl: createProductDto.imageUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prisma.product.create.mockResolvedValueOnce(newProduct);
      expect(await service.create(createProductDto)).toEqual(newProduct);
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
