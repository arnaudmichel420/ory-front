import { create } from "zustand";
import { createSelectors } from "@/store/create-selectors";
import { getItem, removeItem, setItem } from "@/lib/storage";
import { isTokenValid } from "@/lib/auth-token";

export const AUTH_TOKEN_KEY = "auth_token";

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
    const validToken = token && isTokenValid(token) ? token : null;

    if (token && !validToken) {
      await removeItem(AUTH_TOKEN_KEY);
    }

    set({
      hasBootstrapped: true,
      isAuthenticated: Boolean(validToken),
      token: validToken,
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
