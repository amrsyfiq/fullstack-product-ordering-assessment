import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepo: Repository<Brand>,
  ) {}

  /**
   * Distinct brand names, optionally scoped to a category.
   * A brand belongs to one category, so the same name (e.g. "Apple") can exist
   * under several categories. The filter is by name, so we deduplicate here to
   * avoid repeated entries in the dropdown.
   */
  async findDistinctNames(categoryId?: number): Promise<string[]> {
    const qb = this.brandRepo
      .createQueryBuilder('brand')
      .select('DISTINCT brand.name', 'name')
      .orderBy('brand.name', 'ASC');

    if (categoryId) {
      qb.where('brand.category_id = :categoryId', { categoryId });
    }

    const rows = await qb.getRawMany<{ name: string }>();
    return rows.map((row) => row.name);
  }
}
