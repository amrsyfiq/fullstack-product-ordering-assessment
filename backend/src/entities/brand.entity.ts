import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from './category.entity';
import { Product } from './product.entity';

/**
 * A brand (e.g. Apple, Samsung) belongs to exactly one category
 * and can have zero or more products.
 */
@Entity({ name: 'brand' })
export class Brand {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Apple' })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({ example: 1 })
  @Column({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.brands, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
