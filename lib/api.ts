export const api = async (url: string, options: RequestInit = {}) => {
  const stored = localStorage.getItem("adminAuth");
  let token = null;

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      token = parsed?.data?.token;
    } catch (err) {
      console.error("Failed to parse adminAuth:", err);
    }
  }

  const res = await fetch(`http://localhost:5000/api${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const message = await res.text().catch(() => "API request failed");
    throw new Error(message || "API request failed");
  }

  return res.json();
};
