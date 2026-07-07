import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductColor } from '../entities/product-color.entity';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(ProductColor)
    private readonly colorRepo: Repository<ProductColor>,
  ) {}

  /**
   * Distinct color names across the catalogue.
   * The Color filter is by name (e.g. "Blue"), not by a specific product color
   * row, so we deduplicate here.
   */
  async findDistinctNames(): Promise<string[]> {
    const rows = await this.colorRepo
      .createQueryBuilder('color')
      .select('DISTINCT color.name', 'name')
      .orderBy('color.name', 'ASC')
      .getRawMany<{ name: string }>();
    return rows.map((row) => row.name);
  }
}
