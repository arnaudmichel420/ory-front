import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  email: z.email(),
  roles: z.array(z.string()),
  etudiant: z.record(z.string(), z.unknown()).nullable(),
});

export type User = z.infer<typeof userSchema>;
