import { Controller, Get, Post, Body, Delete, Query } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Likes / Wishlist')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @ApiOperation({
    summary: 'Add a product to your wishlist',
  })
  create(@CurrentUser() user: User, @Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(user.id, createLikeDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all the products in your wishlist',
  })
  findAll(@CurrentUser() user: User, @Query('productId') productId?: string) {
    if (productId) {
      return this.likesService.findOne(user.id, +productId);
    }
    return this.likesService.findAll(user.id);
  }

  @Delete()
  @ApiOperation({
    summary: 'Remove a product from your wishlist',
  })
  remove(@Query('productId') productId: string, @CurrentUser() user: User) {
    return this.likesService.remove(user.id, +productId);
  }
}
