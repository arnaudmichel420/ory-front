import { isTokenValid } from "@/lib/auth-token";
import { getItem } from "@/lib/storage";
import { ROUTES } from "@/lib/routes";
import { AUTH_TOKEN_KEY, useSessionStore } from "@/store/session";
import { router } from "expo-router";
import ky from "ky";

async function handleInvalidToken() {
  await useSessionStore.getState().signOut();
  router.replace(ROUTES.root);
}

const api = ky.create({
  prefix: process.env.EXPO_PUBLIC_API_URL ?? "",
  hooks: {
    beforeRequest: [
      async ({ request }) => {
        const token = await getItem(AUTH_TOKEN_KEY);

        if (token && !isTokenValid(token)) {
          await handleInvalidToken();
          throw new Error("Session expiree");
        }

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    beforeError: [
      async ({ error }) => {
        if (!("data" in error)) {
          return error;
        }

        const data = error.data;

        if (typeof data === "string" && data.trim()) {
          error.message = data;
          return error;
        }

        if (
          data &&
          typeof data === "object" &&
          "message" in data &&
          typeof data.message === "string" &&
          data.message.trim()
        ) {
          error.message = data.message;
        }

        return error;
      },
    ],
  },
});

export default api;
