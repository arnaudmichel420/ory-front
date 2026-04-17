import ky from "ky";

export type TokenProvider = () => string | null | Promise<string | null>;

let getToken: TokenProvider = () => null;

export const setTokenProvider = (provider: TokenProvider) => {
  getToken = provider;
};

export const setToken = (token: string | null) => {
  getToken = () => token;
};

const api = ky.create({
  prefix: process.env.EXPO_PUBLIC_API_URL ?? "",
  hooks: {
    beforeRequest: [
      async ({ request }) => {
        const token = await getToken();

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});

export default api;
