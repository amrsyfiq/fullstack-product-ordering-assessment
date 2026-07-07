import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BrandService } from './brand.service';
import { Brand } from '../entities/brand.entity';
import { QueryBrandsDto } from './dto/query-brands.dto';

@ApiTags('brands')
@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  @ApiOperation({
    summary: 'Brands, optionally scoped to a category (Brand filter dropdown).',
  })
  @ApiOkResponse({ type: [Brand] })
  findAll(@Query() query: QueryBrandsDto): Promise<Brand[]> {
    return this.brandService.findAll(query.categoryId);
  }
}
