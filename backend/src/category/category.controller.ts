import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '../entities/category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /** Populates the Category filter dropdown. */
  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }
}
