import { create } from "zustand";
import type { User } from "@supabase/supabase-js";

type Role = "admin" | "participant" | null;

interface AuthState {
  user: User | null;
  role: Role;
  setUser: (user: User | null) => void;
  setRole: (role: Role) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  setUser: (user) => set({ user }),
  setRole: (role) => set({ role }),
  clear: () => set({ user: null, role: null }),
}));
