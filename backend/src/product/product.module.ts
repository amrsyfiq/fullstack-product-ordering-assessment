import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductColor } from '../entities/product-color.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductColor])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
