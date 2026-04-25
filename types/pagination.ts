import { z } from "zod";

const paginationMetaInputSchema = z
  .object({
    page: z.number().int().positive(),
    perPage: z.number().int().positive().optional(),
    limit: z.number().int().positive().optional(),
    total: z.number().int().nonnegative(),
    totalPages: z.number().int().nonnegative(),
    sort: z.string().min(1).optional(),
  })
  .refine(({ perPage, limit }) => perPage !== undefined || limit !== undefined, {
    message: "Pagination metadata must include perPage or limit.",
    path: ["perPage"],
  });

export const paginationMetaSchema = paginationMetaInputSchema.transform(
  ({ limit, perPage, ...meta }) => ({
    ...meta,
    perPage: perPage ?? limit!,
  }),
);

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
