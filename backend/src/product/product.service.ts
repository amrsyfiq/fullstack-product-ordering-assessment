import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductColor } from '../entities/product-color.entity';
import { QueryProductsDto } from './dto/query-products.dto';
import { ProductListingItemDto } from './dto/product-listing-item.dto';
import { Paginated, paginate } from '../common/paginated';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductColor)
    private readonly colorRepo: Repository<ProductColor>,
  ) {}

  async findListing(
    query: QueryProductsDto,
  ): Promise<Paginated<ProductListingItemDto>> {
    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? query.limit : 8;

    const qb = this.colorRepo
      .createQueryBuilder('color')
      .innerJoin('color.product', 'product')
      .innerJoin('product.brand', 'brand')
      .innerJoin('brand.category', 'category')
      .select([
        'color.id AS "productColorId"',
        'color.name AS "color"',
        'product.id AS "productId"',
        'product.code AS "productCode"',
        'product.name AS "productName"',
        'product.price AS "price"',
        'brand.name AS "brand"',
        'category.name AS "category"',
      ]);

    if (query.name) {
      qb.andWhere('product.name ILIKE :name', { name: `%${query.name}%` });
    }
    if (query.categoryId) {
      qb.andWhere('category.id = :categoryId', {
        categoryId: query.categoryId,
      });
    }
    if (query.brandId) {
      qb.andWhere('brand.id = :brandId', { brandId: query.brandId });
    }
    if (query.color) {
      qb.andWhere('color.name = :color', { color: query.color });
    }

    // Deterministic, stable ordering for pagination.
    qb.orderBy('product.id', 'ASC').addOrderBy('color.id', 'ASC');

    const countQb = qb.clone();
    const total = await countQb.getCount();

    const rawRows = await qb
      .offset((page - 1) * limit)
      .limit(limit)
      .getRawMany<{
        productColorId: number;
        color: string;
        productId: number;
        productCode: string;
        productName: string;
        price: string;
        brand: string;
        category: string;
      }>();

    const data: ProductListingItemDto[] = rawRows.map((row) => ({
      productColorId: Number(row.productColorId),
      productId: Number(row.productId),
      productCode: row.productCode,
      productName: row.productName,
      color: row.color,
      price: parseFloat(row.price),
      brand: row.brand,
      category: row.category,
    }));

    return paginate(data, total, page, limit);
  }
}
