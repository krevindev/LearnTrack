import { create } from "zustand";

type AuthUser = {
  uid: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
};

type RegisterData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

type AuthState = {
  user: AuthUser | null;
  loading: boolean;
  init: () => void;
  register: (data: RegisterData) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  init: () => {
    const stored = localStorage.getItem("authUser");
    if (stored) {
      set({ user: JSON.parse(stored), loading: false });
    } else {
      set({ loading: false });
    }
  },
  register: (data) => {
    const fakeUser: AuthUser = {
      uid: crypto.randomUUID(),
      email: data.email,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
    };
    localStorage.setItem("authUser", JSON.stringify(fakeUser));
    set({ user: fakeUser });
  },
  logout: () => {
    localStorage.removeItem("authUser");
    set({ user: null });
  },
}));
