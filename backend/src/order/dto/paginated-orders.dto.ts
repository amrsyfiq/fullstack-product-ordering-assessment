import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from '../../common/pagination-meta.dto';
import { OrderHistoryItemDto } from './order-history-item.dto';

export class PaginatedOrdersDto extends PaginationMetaDto {
  @ApiProperty({ type: [OrderHistoryItemDto] })
  data: OrderHistoryItemDto[];
}
