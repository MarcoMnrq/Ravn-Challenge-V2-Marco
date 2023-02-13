import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { UseRoles } from 'nest-access-control';

@ApiBearerAuth()
@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseRoles({
    resource: 'order',
    action: 'create',
    possession: 'own',
  })
  create(@CurrentUser() user: User) {
    return this.ordersService.create(user.id);
  }
  @Get()
  @UseRoles({
    resource: 'order',
    action: 'read',
    possession: 'any',
  })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('my')
  @UseRoles({
    resource: 'order',
    action: 'read',
    possession: 'own',
  })
  findAllByUserId(@CurrentUser() user: User) {
    return this.ordersService.findAll(user.id);
  }

  @Get(':id')
  @UseRoles({
    resource: 'order',
    action: 'read',
    possession: 'any',
  })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }
}
