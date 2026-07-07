import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

/** Placing an order only requires the chosen product color variant. */
export class CreateOrderDto {
  @ApiProperty({
    example: 3,
    description: 'Product color id from the listing.',
  })
  @IsInt()
  @IsPositive()
  productColorId: number;
}
