// Central place for magic values so they are not scattered across components.

export const PRODUCTS_PAGE_SIZE = 8;
export const ORDERS_PAGE_SIZE = 10;

export const ORDER_STATUS = {
  OPEN: 'Open',
  COMPLETED: 'Completed',
} as const;

export const TABS = {
  PRODUCTS: 'products',
  ORDERS: 'orders',
} as const;
