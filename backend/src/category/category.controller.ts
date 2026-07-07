import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { Category } from '../entities/category.entity';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'All categories (Category filter dropdown).' })
  @ApiOkResponse({ type: [Category] })
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }
}
