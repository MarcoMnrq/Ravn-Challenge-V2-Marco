import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { ProductsModule } from './modules/products/products.module';
import { roles } from './app.roles';
import { AccessControlModule } from 'nest-access-control';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AccessControlModule.forRoles(roles), PrismaModule, ProductsModule, AuthModule, UsersModule],
})
export class AppModule {}
