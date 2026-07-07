import axios from 'axios';
import {
  Category,
  Order,
  OrderStatus,
  PageParams,
  Paginated,
  ProductFilters,
  ProductListingItem,
} from '../types';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({ baseURL });

export const getCategories = (): Promise<Category[]> =>
  api.get<Category[]>('/categories').then((res) => res.data);

export const getBrands = (categoryId?: number): Promise<string[]> =>
  api
    .get<string[]>('/brands', { params: categoryId ? { categoryId } : {} })
    .then((res) => res.data);

export const getColors = (): Promise<string[]> =>
  api.get<string[]>('/colors').then((res) => res.data);

export const getProducts = (
  params: ProductFilters & PageParams,
): Promise<Paginated<ProductListingItem>> =>
  api
    .get<Paginated<ProductListingItem>>('/products', { params })
    .then((res) => res.data);

export const placeOrder = (productColorId: number): Promise<Order> =>
  api.post<Order>('/orders', { productColorId }).then((res) => res.data);

export const getOrders = (params: PageParams): Promise<Paginated<Order>> =>
  api.get<Paginated<Order>>('/orders', { params }).then((res) => res.data);

export const updateOrderStatus = (
  id: number,
  status: OrderStatus,
): Promise<Order> =>
  api.patch<Order>(`/orders/${id}/status`, { status }).then((res) => res.data);

export default api;
