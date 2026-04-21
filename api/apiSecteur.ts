import api from "@/api/api";
import { secteurSchema } from "@/types/metier";
import { z } from "zod";

const secteurListResponseSchema = z
  .union([
    z.array(secteurSchema),
    z.object({
      items: z.array(secteurSchema),
    }),
  ])
  .transform((response) =>
    Array.isArray(response) ? response : response.items,
  );

export const apiListSecteurs = async () => {
  const response = await api.get("api/secteurs").json();

  return secteurListResponseSchema.parse(response);
};
