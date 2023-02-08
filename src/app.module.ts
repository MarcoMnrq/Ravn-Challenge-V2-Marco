import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [PrismaModule, ProductsModule],
})
export class AppModule {}
