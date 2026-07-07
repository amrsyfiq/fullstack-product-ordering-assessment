import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Brand } from './brand.entity';
import { ProductColor } from './product-color.entity';
import { NumericTransformer } from '../common/numeric.transformer';

/**
 * A product (e.g. iPhone 8) belongs to exactly one brand
 * and can have zero or more colors.
 *
 * `code` is the human friendly identifier shown in the UI (e.g. P000001).
 */
@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({
    type: 'numeric',
    precision: 12,
    scale: 2,
    transformer: new NumericTransformer(),
  })
  price: number;

  @Column({ name: 'brand_id' })
  brandId: number;

  @ManyToOne(() => Brand, (brand) => brand.products, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @OneToMany(() => ProductColor, (color) => color.product)
  colors: ProductColor[];
}
