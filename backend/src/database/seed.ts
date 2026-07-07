import dataSource from '../data-source';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';
import { Product } from '../entities/product.entity';
import { ProductColor } from '../entities/product-color.entity';
import { Order, OrderStatus } from '../entities/order.entity';
import { User, UserRole } from '../entities/user.entity';

/**
 * Catalogue definition. Kept declarative so the tree of
 * category -> brand -> product -> color is easy to read and extend.
 */
interface ProductSeed {
  name: string;
  price: number;
  colors: string[];
}
interface BrandSeed {
  name: string;
  products: ProductSeed[];
}
interface CategorySeed {
  name: string;
  brands: BrandSeed[];
}

const CATALOGUE: CategorySeed[] = [
  {
    name: 'Smartphones',
    brands: [
      {
        name: 'Apple',
        products: [
          { name: 'iPhone 8', price: 1230, colors: ['Green', 'Red', 'Blue', 'Yellow'] },
          { name: 'iPhone 9', price: 2230, colors: ['Black', 'Silver', 'Blue', 'Green'] },
        ],
      },
      {
        name: 'Samsung',
        products: [
          { name: 'Galaxy S22', price: 3200, colors: ['Black', 'White', 'Green'] },
          { name: 'Galaxy S23', price: 4200, colors: ['Black', 'Cream', 'Green', 'Lavender'] },
        ],
      },
    ],
  },
  {
    name: 'Tablets',
    brands: [
      {
        name: 'Apple',
        products: [
          { name: 'iPad 9', price: 1500, colors: ['Silver', 'Space Gray'] },
          { name: 'iPad Air', price: 2500, colors: ['Blue', 'Pink', 'Purple', 'Starlight'] },
        ],
      },
      {
        name: 'Samsung',
        products: [
          { name: 'Galaxy Tab S8', price: 3000, colors: ['Graphite', 'Silver', 'Pink Gold'] },
        ],
      },
    ],
  },
];

/**
 * The brief requires no authentication, but the submission asks for customer /
 * admin credentials. We seed them so they exist and can be shared. Passwords are
 * stored in plaintext deliberately: there is no login flow to hash against, and
 * keeping them readable lets a reviewer use the documented credentials directly.
 */
const USERS: Array<Pick<User, 'name' | 'email' | 'password' | 'role'>> = [
  { name: 'Admin User', email: 'admin@example.com', password: 'Admin@123', role: UserRole.ADMIN },
  { name: 'Customer User', email: 'customer@example.com', password: 'Customer@123', role: UserRole.CUSTOMER },
];

function padProductCode(sequence: number): string {
  return `P${sequence.toString().padStart(6, '0')}`;
}

function padOrderNumber(id: number): string {
  return `MY${id.toString().padStart(6, '0')}`;
}

async function seed(): Promise<void> {
  await dataSource.initialize();
  console.log('Connected. Seeding database...');

  await dataSource.transaction(async (manager) => {
    // Reset everything so the seed is repeatable and ids are predictable.
    await manager.query(
      'TRUNCATE TABLE "order", "product_color", "product", "brand", "category", "app_user" RESTART IDENTITY CASCADE',
    );

    let productSequence = 0;
    const savedColors: ProductColor[] = [];

    for (const categorySeed of CATALOGUE) {
      const category = await manager.save(
        manager.create(Category, { name: categorySeed.name }),
      );

      for (const brandSeed of categorySeed.brands) {
        const brand = await manager.save(
          manager.create(Brand, {
            name: brandSeed.name,
            categoryId: category.id,
          }),
        );

        for (const productSeed of brandSeed.products) {
          productSequence += 1;
          const product = await manager.save(
            manager.create(Product, {
              code: padProductCode(productSequence),
              name: productSeed.name,
              price: productSeed.price,
              brandId: brand.id,
            }),
          );

          for (const colorName of productSeed.colors) {
            const color = await manager.save(
              manager.create(ProductColor, {
                name: colorName,
                productId: product.id,
              }),
            );
            savedColors.push(color);
          }
        }
      }
    }

    for (const user of USERS) {
      await manager.save(manager.create(User, user));
    }

    // A few sample orders so Order History is populated on first load.
    const sampleOrders = [
      { color: savedColors[2], status: OrderStatus.COMPLETED }, // iPhone 8 Blue
      { color: savedColors[3], status: OrderStatus.OPEN }, // iPhone 8 Yellow
      { color: savedColors.find((c) => c.name === 'Silver')!, status: OrderStatus.OPEN },
    ];
    for (const sample of sampleOrders) {
      const order = await manager.save(
        manager.create(Order, {
          productColorId: sample.color.id,
          status: sample.status,
          orderNumber: 'PENDING',
        }),
      );
      order.orderNumber = padOrderNumber(order.id);
      await manager.save(order);
    }

    const counts = {
      categories: await manager.count(Category),
      brands: await manager.count(Brand),
      products: await manager.count(Product),
      productColors: await manager.count(ProductColor),
      users: await manager.count(User),
      orders: await manager.count(Order),
    };
    console.log('Seed complete:', counts);
  });

  await dataSource.destroy();
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
  });
