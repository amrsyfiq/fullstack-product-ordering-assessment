import { ApiProperty } from '@nestjs/swagger';

/** One card in the product listing = one product color variant. */
export class ProductListingItemDto {
  @ApiProperty({
    example: 3,
    description: 'Product color id; place an order against this.',
  })
  productColorId: number;

  @ApiProperty({ example: 1 })
  productId: number;

  @ApiProperty({ example: 'P000001' })
  productCode: string;

  @ApiProperty({ example: 'iPhone 8' })
  productName: string;

  @ApiProperty({ example: 'Blue' })
  color: string;

  @ApiProperty({ example: 1230 })
  price: number;

  @ApiProperty({ example: 'Apple' })
  brand: string;

  @ApiProperty({ example: 'Smartphones' })
  category: string;
}
