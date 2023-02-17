import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let prismaService: PrismaService;
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    app = module.createNestApplication();
    await app.init();
    await prismaService.$connect();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await app.close();
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });
});
