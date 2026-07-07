import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from '../../common/pagination-meta.dto';
import { ProductListingItemDto } from './product-listing-item.dto';

export class PaginatedProductsDto extends PaginationMetaDto {
  @ApiProperty({ type: [ProductListingItemDto] })
  data: ProductListingItemDto[];
}
