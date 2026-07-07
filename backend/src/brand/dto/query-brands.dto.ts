import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

/** Optional filter for the brand listing (Brand dropdown). */
export class QueryBrandsDto {
  @ApiPropertyOptional({
    description: 'Scope brands to a category.',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;
}
