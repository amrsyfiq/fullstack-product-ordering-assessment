import { Controller, Get, Query } from '@nestjs/common';
import { ProductService, ProductListingItem } from './product.service';
import { QueryProductsDto } from './dto/query-products.dto';
import { Paginated } from '../common/paginated';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * Product listing. Each returned item is a product color variant (one card).
   * Supports filtering by name/category/brand/color and pagination.
   */
  @Get()
  findListing(
    @Query() query: QueryProductsDto,
  ): Promise<Paginated<ProductListingItem>> {
    return this.productService.findListing(query);
  }
}
