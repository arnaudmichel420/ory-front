import { z } from "zod";

const VALIDATION_MESSAGES = {
  required: "Ce champ est obligatoire.",
  codePostalInvalid: "Le code postal doit contenir 5 chiffres.",
  telephoneInvalid: "Le telephone doit contenir 10 chiffres.",
  currentPasswordRequired: "Le mot de passe actuel est obligatoire.",
  newPasswordRequired: "Le nouveau mot de passe est obligatoire.",
  passwordTooShort: "Le mot de passe doit contenir au moins 8 caracteres.",
  passwordTooLong: "Le mot de passe ne peut pas depasser 255 caracteres.",
  passwordComplexity:
    "Le mot de passe doit contenir une minuscule, une majuscule, un chiffre et un caractere special.",
} as const;

const requiredStringSchema = z.string().trim().min(1, VALIDATION_MESSAGES.required);

const passwordSchema = z
  .string()
  .min(1, VALIDATION_MESSAGES.newPasswordRequired)
  .min(8, VALIDATION_MESSAGES.passwordTooShort)
  .max(255, VALIDATION_MESSAGES.passwordTooLong)
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
    VALIDATION_MESSAGES.passwordComplexity,
  );

export const etudiantProfileSchema = z.object({
  id: z.number(),
  nom: requiredStringSchema,
  prenom: requiredStringSchema,
  adresse: requiredStringSchema,
  ville: requiredStringSchema,
  codePostal: z
    .string()
    .trim()
    .regex(/^\d{5}$/, VALIDATION_MESSAGES.codePostalInvalid),
  telephone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, VALIDATION_MESSAGES.telephoneInvalid),
});

export const etudiantProfileFormSchema = etudiantProfileSchema.omit({
  id: true,
});

export const etudiantProfilePatchSchema = etudiantProfileFormSchema.partial();

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, VALIDATION_MESSAGES.currentPasswordRequired),
  newPassword: passwordSchema,
});

export type EtudiantProfile = z.infer<typeof etudiantProfileSchema>;
export type EtudiantProfileFormValues = z.infer<
  typeof etudiantProfileFormSchema
>;
export type EtudiantProfilePatchPayload = z.infer<
  typeof etudiantProfilePatchSchema
>;
export type ChangePasswordPayload = z.infer<typeof changePasswordSchema>;
