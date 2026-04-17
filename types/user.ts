import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  email: z.email("L'adresse e-mail de l'utilisateur est invalide."),
  roles: z.array(z.string(), {
    message: "La liste des roles est invalide.",
  }),
  etudiant: z.record(z.string(), z.unknown()).nullable(),
});

export type User = z.infer<typeof userSchema>;
