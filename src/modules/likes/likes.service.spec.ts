import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../../database/prisma.service';
import { ProductsService } from '../products/products.service';
import { LikesService } from './likes.service';

describe('LikesService', () => {
  let service: LikesService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LikesService,
        PrismaService,
        {
          provide: ProductsService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = module.get<LikesService>(LikesService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
