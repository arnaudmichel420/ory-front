import { create } from "zustand";
import { createSelectors } from "@/store/create-selectors";
import { getItem, removeItem, setItem } from "@/lib/storage";

const AUTH_TOKEN_KEY = "auth_token";

type SessionState = {
  hasBootstrapped: boolean;
  isAuthenticated: boolean;
  token: string | null;
  bootstrapSession: () => Promise<void>;
  signIn: (token?: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const sessionStore = create<SessionState>((set) => ({
  hasBootstrapped: false,
  isAuthenticated: false,
  token: null,
  bootstrapSession: async () => {
    set({ hasBootstrapped: false });

    const token = await getItem(AUTH_TOKEN_KEY);

    set({
      hasBootstrapped: true,
      isAuthenticated: Boolean(token),
      token,
    });
  },
  signIn: async (token) => {
    if (!token) return;

    await setItem(AUTH_TOKEN_KEY, token);

    set({
      hasBootstrapped: true,
      isAuthenticated: true,
      token,
    });
  },
  signOut: async () => {
    await removeItem(AUTH_TOKEN_KEY);

    set({
      hasBootstrapped: true,
      isAuthenticated: false,
      token: null,
    });
  },
}));

export const useSessionStore = createSelectors(sessionStore);
