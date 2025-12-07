import { api } from "@/lib/api";

export const authServices = {
  login: (data: { email: string; password: string }) => {
    return api("/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  getProfile: () => api("/me"),
  reset: (data: { currentPassword: string; newPassword: string }) => {
    return api("/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
