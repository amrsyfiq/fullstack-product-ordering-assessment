import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BrandService } from './brand.service';
import { QueryBrandsDto } from './dto/query-brands.dto';

@ApiTags('brands')
@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  @ApiOperation({
    summary:
      'Distinct brand names, optionally scoped to a category (Brand dropdown).',
  })
  @ApiOkResponse({ type: [String] })
  findAll(@Query() query: QueryBrandsDto): Promise<string[]> {
    return this.brandService.findDistinctNames(query.categoryId);
  }
}
