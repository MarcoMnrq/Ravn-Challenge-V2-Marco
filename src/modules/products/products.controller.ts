import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseRoles } from 'nest-access-control';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { ExposedEndpoint } from '../../decorators/exposed-endpoint.decorator';

@ApiTags('Products')
@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new product',
  })
  @UseRoles({
    resource: 'product',
    action: 'create',
    possession: 'any',
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get('public')
  @ExposedEndpoint()
  @ApiOperation({
    summary: 'Get all the published products',
  })
  findAllPublic(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.productsService.findAll(paginationQueryDto, {
      isVisible: true,
    });
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all the products',
  })
  @UseRoles({
    resource: 'product',
    action: 'read',
    possession: 'any',
  })
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.productsService.findAll(paginationQueryDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Find one specific product',
  })
  @UseRoles({
    resource: 'product',
    action: 'read',
    possession: 'any',
  })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a single product',
  })
  @UseRoles({
    resource: 'product',
    action: 'update',
    possession: 'any',
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a product',
  })
  @UseRoles({
    resource: 'product',
    action: 'delete',
    possession: 'any',
  })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
