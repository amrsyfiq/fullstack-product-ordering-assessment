// Shared API contract types, mirroring the backend response DTOs so the
// frontend and backend agree on one shape for each endpoint.

export interface Category {
  id: number;
  name: string;
}

export type OrderStatus = 'Open' | 'Completed';

export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/** One card in the product listing = one product color variant. */
export interface ProductListingItem {
  productColorId: number;
  productId: number;
  productCode: string;
  productName: string;
  color: string;
  price: number;
  brand: string;
  category: string;
}

/** A row in the Order History table. */
export interface Order {
  id: number;
  orderNumber: string;
  productCode: string;
  productName: string;
  color: string;
  status: OrderStatus;
  createdAt: string;
}

/** Product listing filters (everything optional, AND-combined). */
export interface ProductFilters {
  name?: string;
  categoryId?: number;
  brand?: string;
  color?: string;
}

export interface PageParams {
  page: number;
  limit: number;
}
