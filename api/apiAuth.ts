import api from "@/api/api";
import {
  type LoginPayload,
  loginResponseSchema,
  meResponseSchema,
  type RegisterPayload,
  registerResponseSchema
} from "@/types/auth";

export const apiLogin = async (payload: LoginPayload) => {
  const response = await api
    .post("api/auth/login", { json: payload })
    .json();

  return loginResponseSchema.parse(response);
};

export const apiRegister = async (payload: RegisterPayload) => {
  const response = await api
    .post("api/auth/register", { json: payload })
    .json();

  return registerResponseSchema.parse(response);
};

export const apiGetMe = async () => {
  const response = await api.get("api/auth/me").json();

  return meResponseSchema.parse(response);
};
