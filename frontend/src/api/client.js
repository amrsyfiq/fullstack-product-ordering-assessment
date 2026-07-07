import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({ baseURL });

export const getCategories = () =>
  api.get('/categories').then((res) => res.data);

export const getBrands = (categoryId) =>
  api
    .get('/brands', { params: categoryId ? { categoryId } : {} })
    .then((res) => res.data);

export const getColors = () => api.get('/colors').then((res) => res.data);

export const getProducts = (params) =>
  api.get('/products', { params }).then((res) => res.data);

export const placeOrder = (productColorId) =>
  api.post('/orders', { productColorId }).then((res) => res.data);

export const getOrders = (params) =>
  api.get('/orders', { params }).then((res) => res.data);

export const updateOrderStatus = (id, status) =>
  api.patch(`/orders/${id}/status`, { status }).then((res) => res.data);

export default api;
