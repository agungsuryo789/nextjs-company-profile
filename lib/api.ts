export const api = async (url: string, options: RequestInit = {}) => {
  const res = await fetch(`http://localhost:5000/api${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("API request failed");
  }

  return res.json();
};
