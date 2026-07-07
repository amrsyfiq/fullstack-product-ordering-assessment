import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepo: Repository<Brand>,
  ) {}

  findAll(categoryId?: number): Promise<Brand[]> {
    const where: FindOptionsWhere<Brand> = {};
    if (categoryId) {
      where.categoryId = categoryId;
    }
    return this.brandRepo.find({ where, order: { name: 'ASC' } });
  }
}
