import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrderService, OrderHistoryItem } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { PaginationQueryDto } from '../common/pagination-query.dto';
import { Paginated } from '../common/paginated';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /** Place an order directly (triggered by the Place Order button). */
  @Post()
  create(@Body() dto: CreateOrderDto): Promise<OrderHistoryItem> {
    return this.orderService.create(dto);
  }

  /** Order history, most recent first, paginated. */
  @Get()
  findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<Paginated<OrderHistoryItem>> {
    return this.orderService.findAll(query);
  }

  /** Update an order's status (e.g. the "Set Completed" action). */
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderStatusDto,
  ): Promise<OrderHistoryItem> {
    return this.orderService.updateStatus(id, dto);
  }
}
