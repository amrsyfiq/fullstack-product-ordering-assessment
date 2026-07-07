import { ApiProperty } from '@nestjs/swagger';

/** Pagination metadata shared by every paginated response. */
export class PaginationMetaDto {
  @ApiProperty({ example: 24, description: 'Total matching records.' })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 8 })
  limit: number;

  @ApiProperty({ example: 3 })
  totalPages: number;
}
