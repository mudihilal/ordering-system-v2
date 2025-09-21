const API_URL = "http://127.0.0.1:8000/api"; // usiweke slash ya mwisho

// 📌 Register
export async function apiRegister(userData) {
  const res = await fetch(`${API_URL}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || "❌ Failed to register user");
  }
  return data;
}

// 📌 Login
export async function apiLogin(credentials) {
  const res = await fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || "❌ Invalid email or password");
  }
  return data;
}

// 📌 Logout (frontend side only)
export function apiLogout() {
  localStorage.removeItem("user");
}

// 📌 Fetch profile
export async function fetchUserProfile(token) {
  const res = await fetch(`${API_URL}/user/profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || "❌ Failed to fetch user profile");
  }
  return data;
}

// 📌 Fetch orders
export async function fetchOrders(token) {
  const res = await fetch(`${API_URL}/orders/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || "❌ Failed to fetch orders");
  }
  return data;
}
