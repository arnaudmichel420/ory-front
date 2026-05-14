import { create } from "zustand";
import { createSelectors } from "@/store/create-selectors";
import { getItem, removeItem, setItem } from "@/lib/storage";
import { isTokenValid } from "@/lib/auth-token";
import type { EtudiantProfile } from "@/types/etudiant";
import { type User, userSchema } from "@/types/user";
import ky from "ky";

export const AUTH_TOKEN_KEY = "auth_token";

type SessionState = {
  hasBootstrapped: boolean;
  isAuthenticated: boolean;
  etudiant: EtudiantProfile | null;
  onbording: boolean | null;
  token: string | null;
  user: User | null;
  bootstrapSession: () => Promise<void>;
  setEtudiant: (etudiant: EtudiantProfile | null) => void;
  setOnbordingStatus: (onbording: boolean | null) => void;
  setUser: (user: User | null) => void;
  signIn: (token?: string, user?: User | null) => Promise<void>;
  signOut: () => Promise<void>;
};

async function getSessionUser(token: string) {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? "";
  const meUrl = `${apiUrl.replace(/\/$/, "")}/api/auth/me`;

  try {
    const response = await ky
      .get(meUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json();

    return userSchema.parse(response);
  } catch {
    return null;
  }
}

const sessionStore = create<SessionState>((set) => ({
  hasBootstrapped: false,
  isAuthenticated: false,
  etudiant: null,
  onbording: null,
  token: null,
  user: null,
  bootstrapSession: async () => {
    set({ hasBootstrapped: false });

    const token = await getItem(AUTH_TOKEN_KEY);
    const validToken = token && isTokenValid(token) ? token : null;
    const user = validToken ? await getSessionUser(validToken) : null;
    const etudiant = user?.etudiant ?? null;
    const onbording = validToken ? (etudiant?.onbording ?? false) : null;

    if (token && !validToken) {
      await removeItem(AUTH_TOKEN_KEY);
    }

    set({
      hasBootstrapped: true,
      isAuthenticated: Boolean(validToken),
      etudiant,
      onbording,
      token: validToken,
      user,
    });
  },
  setEtudiant: (etudiant) => {
    set((state) => ({
      etudiant,
      onbording: etudiant?.onbording ?? false,
      user: state.user ? { ...state.user, etudiant } : state.user,
    }));
  },
  setOnbordingStatus: (onbording) => {
    set((state) => ({
      etudiant: state.etudiant
        ? { ...state.etudiant, onbording: !!onbording }
        : null,
      onbording,
      user:
        state.user && state.user.etudiant
          ? {
              ...state.user,
              etudiant: { ...state.user.etudiant, onbording: !!onbording },
            }
          : state.user,
    }));
  },
  setUser: (user) => {
    const etudiant = user?.etudiant ?? null;

    set({
      etudiant,
      onbording: user ? (etudiant?.onbording ?? false) : null,
      user,
    });
  },
  signIn: async (token, user = null) => {
    if (!token) return;

    await setItem(AUTH_TOKEN_KEY, token);

    const etudiant = user?.etudiant ?? null;

    set({
      hasBootstrapped: true,
      isAuthenticated: true,
      etudiant,
      onbording: user ? (etudiant?.onbording ?? false) : null,
      token,
      user,
    });
  },
  signOut: async () => {
    await removeItem(AUTH_TOKEN_KEY);

    set({
      hasBootstrapped: true,
      isAuthenticated: false,
      etudiant: null,
      onbording: null,
      token: null,
      user: null,
    });
  },
}));

export const useSessionStore = createSelectors(sessionStore);
