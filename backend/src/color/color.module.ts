import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductColor } from '../entities/product-color.entity';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductColor])],
  controllers: [ColorController],
  providers: [ColorService],
})
export class ColorModule {}
