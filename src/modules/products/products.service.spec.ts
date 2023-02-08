import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { mockDeep } from 'jest-mock-extended';
import { DeepMockProxy } from 'jest-mock-extended/lib/Mock';
import { PrismaService } from '../../database/prisma.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let spyPrismaService: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PrismaService,
          useFactory: () => mockDeep<PrismaService>(),
        },
      ],
    }).compile();
    service = module.get<ProductsService>(ProductsService);
    spyPrismaService = module.get(
      PrismaService,
    ) as DeepMockProxy<PrismaService>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
