import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';
import { validateEnv } from './config/env.validation';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { ColorModule } from './color/color.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    TypeOrmModule.forRoot(dataSourceOptions),
    CategoryModule,
    BrandModule,
    ColorModule,
    ProductModule,
    OrderModule,
  ],
})
export class AppModule {}
