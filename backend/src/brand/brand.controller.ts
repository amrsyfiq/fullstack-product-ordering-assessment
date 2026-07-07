import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { BrandService } from './brand.service';
import { Brand } from '../entities/brand.entity';

@ApiTags('brands')
@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  @ApiOperation({
    summary: 'Brands, optionally scoped to a category (Brand filter dropdown).',
  })
  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  @ApiOkResponse({ type: [Brand] })
  findAll(
    @Query('categoryId', new ParseIntPipe({ optional: true }))
    categoryId?: number,
  ): Promise<Brand[]> {
    return this.brandService.findAll(categoryId);
  }
}
