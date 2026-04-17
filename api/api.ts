import { getItem } from "@/lib/storage";
import { AUTH_TOKEN_KEY } from "@/store/session";
import ky from "ky";

const api = ky.create({
  prefix: process.env.EXPO_PUBLIC_API_URL ?? "",
  hooks: {
    beforeRequest: [
      async ({ request }) => {
        const token = await getItem(AUTH_TOKEN_KEY);

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
