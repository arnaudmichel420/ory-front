import { userSchema } from "@/types/user";
import { z } from "zod";

const VALIDATION_MESSAGES = {
  emailRequired: "L'adresse e-mail est obligatoire.",
  emailInvalid: "Veuillez saisir une adresse e-mail valide.",
  emailTooLong: "L'adresse e-mail ne peut pas depasser 180 caracteres.",
  passwordRequired: "Le mot de passe est obligatoire.",
  passwordTooShort: "Le mot de passe doit contenir au moins 8 caracteres.",
  passwordTooLong: "Le mot de passe ne peut pas depasser 255 caracteres.",
  passwordComplexity:
    "Le mot de passe doit contenir une minuscule, une majuscule, un chiffre et un caractere special.",
  confirmPasswordRequired: "La confirmation du mot de passe est obligatoire.",
  passwordMismatch: "Les mots de passe ne correspondent pas.",
} as const;

const emailSchema = z
  .string()
  .min(1, VALIDATION_MESSAGES.emailRequired)
  .pipe(
    z
      .email(VALIDATION_MESSAGES.emailInvalid)
      .max(180, VALIDATION_MESSAGES.emailTooLong),
  );

const passwordSchema = z
  .string()
  .min(1, VALIDATION_MESSAGES.passwordRequired)
  .max(255, VALIDATION_MESSAGES.passwordTooLong);

const registerPasswordSchema = z
  .string()
  .min(1, VALIDATION_MESSAGES.passwordRequired)
  .min(8, VALIDATION_MESSAGES.passwordTooShort)
  .max(255, VALIDATION_MESSAGES.passwordTooLong)
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
    VALIDATION_MESSAGES.passwordComplexity,
  );

export const loginPayloadSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerPayloadSchema = z.object({
  email: emailSchema,
  password: registerPasswordSchema,
});

export const registerFormSchema = registerPayloadSchema
  .extend({
    confirmPassword: z.string().min(
      1,
      VALIDATION_MESSAGES.confirmPasswordRequired,
    ),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: VALIDATION_MESSAGES.passwordMismatch,
    path: ["confirmPassword"],
  });

export const loginResponseSchema = z.object({
  token: z.string().min(1),
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
