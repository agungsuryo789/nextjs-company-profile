export const api = async (url: string, options: RequestInit = {}) => {
  let token: string | null = null;

  if (typeof document !== "undefined") {
    const match = document.cookie.match(/(?:^|;\s*)adminToken=([^;]+)/);
    token = match ? decodeURIComponent(match[1]) : null;
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
