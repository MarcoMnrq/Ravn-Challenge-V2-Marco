import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseRoles } from 'nest-access-control';

@ApiBearerAuth()
@ApiTags('Products')
@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({
    summary: 'Create a new product',
  })
  @Post()
  @UseRoles({
    resource: 'product',
    action: 'create',
    possession: 'any',
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({
    summary: 'Get all the visible products',
  })
  @Get()
  @UseRoles({
    resource: 'product',
    action: 'read',
    possession: 'any',
  })
  findAll() {
    return this.productsService.findAll();
  }

  @ApiOperation({
    summary: 'Find one specific product',
  })
  @Get(':id')
  @UseRoles({
    resource: 'product',
    action: 'read',
    possession: 'any',
  })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update a single product',
  })
  @Patch(':id')
  @UseRoles({
    resource: 'product',
    action: 'update',
    possession: 'any',
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @ApiOperation({
    summary: 'Delete a product',
  })
  @Delete(':id')
  @UseRoles({
    resource: 'product',
    action: 'delete',
    possession: 'any',
  })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
