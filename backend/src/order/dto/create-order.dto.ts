import { IsInt, IsPositive } from 'class-validator';

/** Placing an order only requires the chosen product color variant. */
export class CreateOrderDto {
  @IsInt()
  @IsPositive()
  productColorId: number;
}
