const API_URL = "http://127.0.0.1:8000/api";

export async function apiRegister(userData) {
  const res = await fetch(`${API_URL}/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error("❌ Failed to register user");
  }

  return await res.json();
}

export async function apiLogin(credentials) {
  const res = await fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    throw new Error("❌ Invalid email or password");
  }

  return await res.json(); 
}

export function apiLogout() {
  localStorage.removeItem("user");
}

export async function fetchUserProfile(token) {
  const res = await fetch(`${API_URL}/user/profile/`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("❌ Failed to fetch user profile");
  }

  return await res.json();
}

export async function fetchOrders(token) {
  const res = await fetch(`${API_URL}/orders/`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("❌ Failed to fetch orders");
  }

  return await res.json();
}
