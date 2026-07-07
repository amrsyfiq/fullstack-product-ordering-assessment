import { config as loadEnv } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Category } from './entities/category.entity';
import { Brand } from './entities/brand.entity';
import { Product } from './entities/product.entity';
import { ProductColor } from './entities/product-color.entity';
import { Order } from './entities/order.entity';
import { User } from './entities/user.entity';

loadEnv();

/**
 * Single source of truth for the database connection.
 * Consumed by the NestJS TypeOrmModule (see app.module.ts), the TypeORM CLI
 * for migrations, and the seed script.
 */
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME ?? 'assessment',
  password: process.env.DB_PASSWORD ?? 'assessment',
  database: process.env.DB_DATABASE ?? 'assessment',
  entities: [Category, Brand, Product, ProductColor, Order, User],
  migrations: [__dirname + '/database/migrations/*.{ts,js}'],
  // Schema changes go through migrations, never auto-sync.
  synchronize: false,
  logging: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
