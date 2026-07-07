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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderHistoryItemDto } from './dto/order-history-item.dto';
import { PaginatedOrdersDto } from './dto/paginated-orders.dto';
import { PaginationQueryDto } from '../common/pagination-query.dto';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Place an order (Place Order button).' })
  @ApiCreatedResponse({ type: OrderHistoryItemDto })
  create(@Body() dto: CreateOrderDto): Promise<OrderHistoryItemDto> {
    return this.orderService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Order history, most recent first, paginated.' })
  @ApiOkResponse({ type: PaginatedOrdersDto })
  findAll(@Query() query: PaginationQueryDto): Promise<PaginatedOrdersDto> {
    return this.orderService.findAll(query);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: "Update an order's status (e.g. Set Completed)." })
  @ApiOkResponse({ type: OrderHistoryItemDto })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderStatusDto,
  ): Promise<OrderHistoryItemDto> {
    return this.orderService.updateStatus(id, dto);
  }
}
