import {
  createPaginatedResponseSchema,
  type PaginatedResponse,
} from "@/types/pagination";
import { z } from "zod";

export const metierSortSchema = z.enum(["libelle", "-libelle"]);

export const metierListQuerySchema = z.object({
  page: z.number().int().positive().optional(),
  perPage: z.number().int().positive().max(100).optional(),
  sort: metierSortSchema.optional(),
  search: z.string().max(255).optional(),
  secteurIds: z.array(z.number().int().positive()).optional(),
  transitionEco: z.boolean().optional(),
  transitionNum: z.boolean().optional(),
  emploiCadre: z.boolean().optional(),
});

export const sousDomaineSchema = z.object({
  id: z.number(),
  code: z.string(),
  libelle: z.string(),
});

export const secteurSchema = z.object({
  id: z.number(),
  libelle: z.string().nullable(),
  code: z.string().nullable(),
});

export const metierSecteurSchema = z.object({
  id: z.number(),
  principal: z.boolean().nullable(),
  secteur: secteurSchema.nullable(),
});

export const metierListItemSchema = z.object({
  codeOgr: z.string().min(1),
  codeRome: z.string().min(1).optional(),
  libelle: z.string().min(1),
  description: z.string().nullable().optional(),
  transitionEco: z.boolean().nullable().optional(),
  transitionNum: z.boolean().nullable().optional(),
  emploiCadre: z.boolean().nullable().optional(),
  saved: z.boolean().optional().default(false),
  secteurs: z.array(metierSecteurSchema).optional().default([]),
});

export const metierSavedListQuerySchema = z.object({
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
});

export const competenceSchema = z.object({
  codeOgr: z.string().nullable(),
  libelle: z.string().nullable(),
  type: z.string().nullable(),
  transitionEco: z.boolean().nullable(),
  transitionNum: z.boolean().nullable(),
});

export const competenceItemSchema = z.object({
  id: z.number().nullable(),
  libelleEnjeu: z.string().nullable(),
  coeurMetier: z.number().int().nullable(),
  competence: competenceSchema,
});

export const metierCompetenceTypeSchema = z.enum([
  "savoir_faire",
  "savoir_etre_professionel",
  "savoir",
]);

export const contexteTravailTypeSchema = z.enum([
  "Conditions de travail et risques professionnels",
  "Horaires et durée du travail",
  "Lieux et déplacements",
  "Publics spécifiques",
  "Statut d'emploi",
  "Types de structures",
  "unknown",
]);

export const contexteTravailSchema = z.object({
  codeOgr: z.string().nullable(),
  libelle: z.string().nullable(),
  typeContexte: z.string().nullable(),
});

export const metierContexteTravailSchema = z.object({
  id: z.number().nullable(),
  libelleGroupe: z.string().nullable(),
  contexteTravail: contexteTravailSchema,
});

export const contextesTravailByTypeSchema = z.partialRecord(
  contexteTravailTypeSchema,
  z.array(metierContexteTravailSchema),
);

export const metierDetailSchema = z.object({
  codeOgr: z.string(),
  codeRome: z.string(),
  libelle: z.string(),
  definition: z.string().nullable(),
  accesMetier: z.string().nullable(),
  transitionEco: z.boolean().nullable(),
  transitionNum: z.boolean().nullable(),
  emploiReglemente: z.boolean().nullable(),
  emploiCadre: z.boolean().nullable(),
  saved: z.boolean(),
  sousDomaine: sousDomaineSchema.nullable(),
  secteurs: z.array(metierSecteurSchema),
  competences: z.record(
    metierCompetenceTypeSchema,
    z.array(competenceItemSchema),
  ),
  contextesTravail: contextesTravailByTypeSchema,
});

export const metierListResponseSchema =
  createPaginatedResponseSchema(metierListItemSchema);

export const metierSaveToggleResponseSchema = z.object({
  saved: z.boolean(),
});

export const metierInteractionTypeSchema = z.enum([
  "vue",
  "sauvegarde",
  "challenge",
]);

export const metierInteractionPayloadSchema = z.object({
  type: metierInteractionTypeSchema,
});

export const metierInteractionResponseSchema = z.object({
  active: z.literal(true),
  type: metierInteractionTypeSchema,
});

export type MetierSort = z.infer<typeof metierSortSchema>;
export type MetierListQuery = z.infer<typeof metierListQuerySchema>;
export type MetierListItem = z.infer<typeof metierListItemSchema>;
export type MetierSavedListQuery = z.infer<typeof metierSavedListQuerySchema>;
export type SousDomaine = z.infer<typeof sousDomaineSchema>;
export type Secteur = z.infer<typeof secteurSchema>;
export type MetierSecteur = z.infer<typeof metierSecteurSchema>;
export type Competence = z.infer<typeof competenceSchema>;
export type CompetenceItem = z.infer<typeof competenceItemSchema>;
export type MetierCompetenceType = z.infer<typeof metierCompetenceTypeSchema>;
export type ContexteTravailType = z.infer<typeof contexteTravailTypeSchema>;
export type ContexteTravail = z.infer<typeof contexteTravailSchema>;
export type MetierContexteTravail = z.infer<typeof metierContexteTravailSchema>;
export type ContextesTravailByType = z.infer<
  typeof contextesTravailByTypeSchema
>;
export type MetierDetail = z.infer<typeof metierDetailSchema>;
export type MetierListResponse = PaginatedResponse<MetierListItem>;
export type MetierSaveToggleResponse = z.infer<
  typeof metierSaveToggleResponseSchema
>;
export type MetierInteractionType = z.infer<typeof metierInteractionTypeSchema>;
export type MetierInteractionPayload = z.infer<
  typeof metierInteractionPayloadSchema
>;
export type MetierInteractionResponse = z.infer<
  typeof metierInteractionResponseSchema
>;
