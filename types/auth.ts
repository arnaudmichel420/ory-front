import { userSchema } from "@/types/user";
import { z } from "zod";

export const loginPayloadSchema = z.object({
  email: z.email().max(180),
  password: z.string().min(1).max(255),
});

export const registerPayloadSchema = z.object({
  email: z.email().max(180),
  password: z
    .string()
    .min(8)
    .max(255)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
      "Le mot de passe doit contenir une minuscule, une majuscule, un chiffre et un caractere special.",
    ),
});

export const registerFormSchema = registerPayloadSchema
  .extend({
    confirmPassword: z
      .string()
      .min(1, "La confirmation du mot de passe est obligatoire."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });

export const loginResponseSchema = z.object({
  token: z.string(),
  user: userSchema,
});

export const registerResponseSchema = userSchema;

export const meResponseSchema = userSchema;

export type LoginPayload = z.infer<typeof loginPayloadSchema>;
export type RegisterPayload = z.infer<typeof registerPayloadSchema>;
export type RegisterFormValues = z.infer<typeof registerFormSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type RegisterResponse = z.infer<typeof registerResponseSchema>;
export type MeResponse = z.infer<typeof meResponseSchema>;
