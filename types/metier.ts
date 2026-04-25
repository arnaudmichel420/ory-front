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
  id: z.number().int(),
  code: z.string().min(1),
  libelle: z.string().min(1),
});

export const secteurSchema = z.object({
  id: z.number().int(),
  code: z.string().min(1),
  libelle: z.string().min(1),
});

export const metierSecteurSchema = z.object({
  id: z.number().int(),
  secteur: secteurSchema,
  principal: z.boolean().nullable(),
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
  codeOgr: z.string().min(1),
  libelle: z.string().min(1),
  type: z.string().min(1),
  transitionEco: z.boolean().nullable(),
  transitionNum: z.boolean().nullable(),
});

export const metierCompetenceSchema = z.object({
  id: z.number().int(),
  codeOgrComp: competenceSchema,
  type: z.string().min(1),
  libelleEnjeu: z.string().nullable(),
  coeurMetier: z.number().int(),
});

export const contexteTravailSchema = z.object({
  codeOgr: z.string().min(1),
  libelle: z.string().min(1),
  typeContexte: z.string().nullable(),
});

export const metierContexteTravailSchema = z.object({
  id: z.number().int(),
  codeOgrContexte: contexteTravailSchema,
  libelleGroupe: z.string().nullable(),
});

export const metierDetailSchema = metierListItemSchema.extend({
  definition: z.string().nullable(),
  accesMetier: z.string().nullable(),
  emploiReglemente: z.boolean().nullable(),
  sousDomaine: sousDomaineSchema.nullable(),
  contextesTravail: z.array(metierContexteTravailSchema),
  competences: z.array(metierCompetenceSchema),
});

export const metierListResponseSchema =
  createPaginatedResponseSchema(metierListItemSchema);

export const metierSaveToggleResponseSchema = z.object({
  saved: z.boolean(),
});

export type MetierSort = z.infer<typeof metierSortSchema>;
export type MetierListQuery = z.infer<typeof metierListQuerySchema>;
export type MetierListItem = z.infer<typeof metierListItemSchema>;
export type MetierSavedListQuery = z.infer<typeof metierSavedListQuerySchema>;
export type SousDomaine = z.infer<typeof sousDomaineSchema>;
export type Secteur = z.infer<typeof secteurSchema>;
export type MetierSecteur = z.infer<typeof metierSecteurSchema>;
export type Competence = z.infer<typeof competenceSchema>;
export type MetierCompetence = z.infer<typeof metierCompetenceSchema>;
export type ContexteTravail = z.infer<typeof contexteTravailSchema>;
export type MetierContexteTravail = z.infer<
  typeof metierContexteTravailSchema
>;
export type MetierDetail = z.infer<typeof metierDetailSchema>;
export type MetierListResponse = PaginatedResponse<MetierListItem>;
export type MetierSaveToggleResponse = z.infer<
  typeof metierSaveToggleResponseSchema
>;
