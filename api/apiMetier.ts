import api from "@/api/api";
import { createSearchParams } from "@/lib/search-params";
import {
  type MetierDetail,
  metierDetailSchema,
  type MetierInteractionPayload,
  type MetierInteractionResponse,
  metierInteractionPayloadSchema,
  metierInteractionResponseSchema,
  type MetierListQuery,
  type MetierListResponse,
  metierListResponseSchema,
  type MetierSavedListQuery,
  type MetierSaveToggleResponse,
  metierSaveToggleResponseSchema,
} from "@/types/metier";

export const apiListMetiers = async (
  query: MetierListQuery = {},
): Promise<MetierListResponse> => {
  const response = await api
    .get("api/metiers", {
      searchParams: createSearchParams(
        {
          page: query.page,
          perPage: query.perPage,
          sort: query.sort,
          search: query.search,
          transitionEco: query.transitionEco,
          transitionNum: query.transitionNum,
          emploiCadre: query.emploiCadre,
        },
        {
          "secteurIds[]": query.secteurIds,
        },
      ),
    })
    .json();

  return metierListResponseSchema.parse(response);
};

export const apiGetMetier = async (codeOgr: string): Promise<MetierDetail> => {
  const response = await api.get(`api/metiers/${codeOgr}`).json();

  return metierDetailSchema.parse(response);
};

export const apiListSavedMetiers = async (
  query: MetierSavedListQuery = {},
): Promise<MetierListResponse> => {
  const response = await api
    .get("api/me/metiers/saved", {
      searchParams: createSearchParams({
        page: query.page,
        limit: query.limit,
      }),
    })
    .json();

  return metierListResponseSchema.parse(response);
};

export const apiToggleSaveMetier = async (
  codeOgr: string,
): Promise<MetierSaveToggleResponse> => {
  const response = await api.post(`api/metiers/${codeOgr}/save`).json();

  return metierSaveToggleResponseSchema.parse(response);
};

export const apiCreateMetierInteraction = async (
  codeOgr: string,
  payload: MetierInteractionPayload,
): Promise<MetierInteractionResponse> => {
  const response = await api
    .post(`api/metiers/${codeOgr}/interactions`, {
      json: metierInteractionPayloadSchema.parse(payload),
    })
    .json();

  return metierInteractionResponseSchema.parse(response);
};
