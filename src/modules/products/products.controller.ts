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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UseRoles } from 'nest-access-control';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { ExposedEndpoint } from '../../decorators/exposed-endpoint.decorator';
import { SearchProductQueryDto } from './dto/search-product-query.dto';

@ApiTags('Products')
@Controller({
  path: '',
  version: '1',
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('products')
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

  @Get('public/products')
  @ExposedEndpoint()
  @ApiOperation({
    summary: 'Get all the published products',
  })
  findAllPublic(@Query() searchProductDto: SearchProductQueryDto) {
    const conditions = searchProductDto.category
      ? {
          isVisible: true,
          category: {
            contains: searchProductDto.category,
          },
        }
      : {
          isVisible: true,
        };
    return this.productsService.findAll(searchProductDto, conditions);
  }

  @Get('products')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all the products',
  })
  @UseRoles({
    resource: 'product',
    action: 'read',
    possession: 'any',
  })
  findAll(@Query() searchProductDto: SearchProductQueryDto) {
    const conditions = searchProductDto.category
      ? {
          category: {
            contains: searchProductDto.category,
          },
        }
      : undefined;
    return this.productsService.findAll(searchProductDto, conditions);
  }

  @Get('products/:id')
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

  @Patch('products/:id')
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

  @Delete('products/:id')
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
