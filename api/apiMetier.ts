import api from "@/api/api";
import { createSearchParams } from "@/lib/search-params";
import {
  type MetierDetail,
  metierDetailSchema,
  type MetierListQuery,
  type MetierListResponse,
  metierListResponseSchema,
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
