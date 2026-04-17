import { z } from "zod";

export const paginationMetaSchema = z.object({
  page: z.number().int().positive(),
  perPage: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
  sort: z.string().min(1),
});

export const createPaginatedResponseSchema = <TItem extends z.ZodTypeAny>(
  itemSchema: TItem,
) =>
  z.object({
    items: z.array(itemSchema),
    meta: paginationMetaSchema,
  });

export type PaginationMeta = z.infer<typeof paginationMetaSchema>;
export type PaginatedResponse<TItem> = {
  items: TItem[];
  meta: PaginationMeta;
};
