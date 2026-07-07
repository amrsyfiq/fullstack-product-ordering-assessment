import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { BrandService } from './brand.service';
import { Brand } from '../entities/brand.entity';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  /**
   * Populates the Brand filter dropdown.
   * Optionally scoped to a category so the dropdown can react to the selected
   * category.
   */
  @Get()
  findAll(
    @Query('categoryId', new ParseIntPipe({ optional: true }))
    categoryId?: number,
  ): Promise<Brand[]> {
    return this.brandService.findAll(categoryId);
  }
}
