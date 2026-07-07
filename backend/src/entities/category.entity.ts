import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Brand } from './brand.entity';

/**
 * Top level of the catalogue hierarchy.
 * A category (e.g. Smartphones, Tablets) can have zero or more brands.
 */
@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @OneToMany(() => Brand, (brand) => brand.category)
  brands: Brand[];
}
