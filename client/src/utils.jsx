export async function api(endpoint, method = "GET", body) {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await fetch(`http://localhost:5000/api${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  }
}