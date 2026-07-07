import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../../entities/order.entity';

/** Row shape for the Order History table. */
export class OrderHistoryItemDto {
  @ApiProperty({
    example: 1,
    description: 'Numeric primary key (used by the status endpoint).',
  })
  id: number;

  @ApiProperty({ example: 'MY000001' })
  orderNumber: string;

  @ApiProperty({ example: 'P000001' })
  productCode: string;

  @ApiProperty({ example: 'iPhone 8' })
  productName: string;

  @ApiProperty({ example: 'Blue' })
  color: string;

  @ApiProperty({ enum: OrderStatus, example: OrderStatus.OPEN })
  status: OrderStatus;

  @ApiProperty({ example: '2026-07-07T07:15:00.000Z' })
  createdAt: Date;
}
