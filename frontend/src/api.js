import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000/api'

export const api = axios.create({ baseURL: API_BASE })

export const fetchProducts = () => api.get('/products/')
export const createOrder = (payload) => api.post('/orders/', payload)
export const markProductSold = (id) => api.post(`/products/${id}/mark_sold/`)
export const completeOrder = (id) => api.post(`/orders/${id}/complete/`)
