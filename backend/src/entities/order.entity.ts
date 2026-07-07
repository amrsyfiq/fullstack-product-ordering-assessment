import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductColor } from './product-color.entity';

export enum OrderStatus {
  OPEN = 'Open',
  COMPLETED = 'Completed',
}

/**
 * An order placed against a specific product color.
 * `orderNumber` is the human friendly identifier shown in the UI (e.g. MY000001).
 * The referenced product color lets us derive product id/name and color for the
 * order history table without duplicating catalogue data.
 */
@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'order_number', type: 'varchar', length: 20, unique: true })
  orderNumber: string;

  @Column({ name: 'product_color_id' })
  productColorId: number;

  @ManyToOne(() => ProductColor, { eager: true })
  @JoinColumn({ name: 'product_color_id' })
  productColor: ProductColor;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.OPEN,
  })
  status: OrderStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
