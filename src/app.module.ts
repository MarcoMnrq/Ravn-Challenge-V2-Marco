import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { ProductsModule } from './modules/products/products.module';
import { roles } from './app.roles';
import { AccessControlModule, ACGuard } from 'nest-access-control';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';

@Module({
  imports: [
    AccessControlModule.forRoles(roles),
    PrismaModule,
    AuthModule,
    UsersModule,
    ProductsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ACGuard,
    },
  ],
})
export class AppModule {}
