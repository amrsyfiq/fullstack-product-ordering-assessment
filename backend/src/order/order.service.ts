import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order, OrderStatus } from '../entities/order.entity';
import { ProductColor } from '../entities/product-color.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { PaginationQueryDto } from '../common/pagination-query.dto';
import { Paginated, paginate } from '../common/paginated';

/** Row shape for the Order History table. */
export interface OrderHistoryItem {
  id: number;
  orderNumber: string;
  productCode: string;
  productName: string;
  color: string;
  status: OrderStatus;
  createdAt: Date;
}

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Places an order against a product color.
   * The order number (e.g. MY000001) is derived from the generated primary key
   * inside a transaction, which keeps it unique and gap-consistent without a
   * separate counter table or a race condition.
   */
  async create(dto: CreateOrderDto): Promise<OrderHistoryItem> {
    const orderId = await this.dataSource.transaction(async (manager) => {
      const color = await manager.findOne(ProductColor, {
        where: { id: dto.productColorId },
      });
      if (!color) {
        throw new NotFoundException(
          `Product color ${dto.productColorId} not found`,
        );
      }

      const order = manager.create(Order, {
        productColorId: dto.productColorId,
        status: OrderStatus.OPEN,
        // Temporary placeholder, replaced once the id is known.
        orderNumber: 'PENDING',
      });
      const saved = await manager.save(order);
      saved.orderNumber = OrderService.formatOrderNumber(saved.id);
      await manager.save(saved);
      return saved.id;
    });

    return this.findOneMapped(orderId);
  }

  async findAll(
    query: PaginationQueryDto,
  ): Promise<Paginated<OrderHistoryItem>> {
    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? query.limit : 10;

    const [orders, total] = await this.orderRepo.findAndCount({
      relations: { productColor: { product: true } },
      order: { createdAt: 'DESC', id: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return paginate(orders.map(OrderService.toHistoryItem), total, page, limit);
  }

  async updateStatus(
    id: number,
    dto: UpdateOrderStatusDto,
  ): Promise<OrderHistoryItem> {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }
    order.status = dto.status;
    await this.orderRepo.save(order);
    return this.findOneMapped(id);
  }

  private async findOneMapped(id: number): Promise<OrderHistoryItem> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: { productColor: { product: true } },
    });
    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }
    return OrderService.toHistoryItem(order);
  }

  private static formatOrderNumber(id: number): string {
    return `MY${id.toString().padStart(6, '0')}`;
  }

  private static toHistoryItem(order: Order): OrderHistoryItem {
    return {
      id: order.id,
      orderNumber: order.orderNumber,
      productCode: order.productColor.product.code,
      productName: order.productColor.product.name,
      color: order.productColor.name,
      status: order.status,
      createdAt: order.createdAt,
    };
  }
}
