const API_URL = "http://127.0.0.1:8000/api";

const authHeaders = (token) => ({
  "Content-Type": "application/json",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

export async function getOrders(token) {
  const res = await fetch(`${API_URL}/orders/`, { headers: authHeaders(token) });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function createOrder(token, orderData) {
  const res = await fetch(`${API_URL}/orders/`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(orderData),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
}

export async function confirmOrder(token, orderId) {
  const res = await fetch(`${API_URL}/orders/${orderId}/confirm/`, {
    method: "PATCH",
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to confirm order");
  return res.json();
}
