
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products/`);
  return res.json();
}

export async function register(data) {
  const res = await fetch(`${API_BASE}/auth/register/`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function login(credentials) {
  const res = await fetch(`${API_BASE}/auth/login/`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(credentials),
  });
  return res.json(); 
}

export async function createOrder(order, token) {
  const res = await fetch(`${API_BASE}/orders/`, {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(order),
  });
  return res.json();
}
export default API;
