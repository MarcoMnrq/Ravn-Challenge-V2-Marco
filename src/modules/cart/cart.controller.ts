import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@ApiBearerAuth()
@ApiTags('Shopping Cart')
@Controller('cart-items')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({
    summary: 'Add product to shopping cart',
  })
  create(@CurrentUser() user: User, @Body() addCartItemDto: AddCartItemDto) {
    return this.cartService.addItem(user.id, addCartItemDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all products in the shopping cart',
  })
  findAll(@CurrentUser() user: User) {
    return this.cartService.getItems(user.id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a product quantity in the shopping cart',
  })
  update(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(+id, user.id, updateCartItemDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove a product from the shopping cart',
  })
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.cartService.removeItem(+id, user.id);
  }
}
