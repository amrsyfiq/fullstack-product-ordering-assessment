import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { QueryProductsDto } from './dto/query-products.dto';
import { PaginatedProductsDto } from './dto/paginated-products.dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({
    summary: 'Product listing',
    description:
      'Each item is a product color variant (one card). Supports filtering by ' +
      'name/category/brand/color and pagination.',
  })
  @ApiOkResponse({ type: PaginatedProductsDto })
  findListing(@Query() query: QueryProductsDto): Promise<PaginatedProductsDto> {
    return this.productService.findListing(query);
  }
}
