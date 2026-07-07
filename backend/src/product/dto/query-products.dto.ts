import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

/**
 * Query params for the product listing.
 * All filters are optional; combined with AND semantics.
 */
export class QueryProductsDto {
  /** Free text match on product name (case-insensitive, partial). */
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  brandId?: number;

  /** Color name, e.g. "Blue". */
  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 8;
}
