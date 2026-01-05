import { create } from "zustand";
import { User } from "firebase/auth";
import { loginWithEmail, logoutUser } from "../services/authServices";

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
      const user = await loginWithEmail(email, password);
      set({ user, loading: false });
    } catch (err: any) {
      set({ error: err.message ?? "Login Failed", loading: false });
    }
  },
  logout: async () => {
    await logoutUser();
    set({ user: null });
  },
}));
