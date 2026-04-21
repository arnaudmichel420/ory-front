import { apiListSecteurs } from "@/api/apiSecteur";
import {
  type MetierListQuery,
  type MetierSort,
  type Secteur,
} from "@/types/metier";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";

const SORT_VALUES = ["libelle", "-libelle"] as const;

type MetierFilters = Pick<
  MetierListQuery,
  | "sort"
  | "search"
  | "secteurIds"
  | "transitionEco"
  | "transitionNum"
  | "emploiCadre"
>;

function getStringParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getBooleanParam(value: string | string[] | undefined) {
  const stringValue = getStringParam(value);

  if (stringValue === "true") return true;
  if (stringValue === "false") return false;

  return undefined;
}

function getSecteurIdsParam(value: string | string[] | undefined) {
  const values = Array.isArray(value) ? value : value?.split(",");
  const secteurIds = values
    ?.map((item) => Number(item.trim()))
    .filter((item) => Number.isInteger(item) && item > 0);

  return secteurIds && secteurIds.length > 0 ? secteurIds : undefined;
}

function getFiltersFromParams(
  params: Record<string, string | string[] | undefined>,
): MetierFilters {
  const sortParam = getStringParam(params.sort);
  const sort = SORT_VALUES.includes(sortParam as MetierSort)
    ? (sortParam as MetierSort)
    : "libelle";
  const search = getStringParam(params.search)?.slice(0, 255).trim();

  return {
    sort,
    search: search || undefined,
    secteurIds: getSecteurIdsParam(params.secteurIds),
    transitionEco: getBooleanParam(params.transitionEco),
    transitionNum: getBooleanParam(params.transitionNum),
    emploiCadre: getBooleanParam(params.emploiCadre),
  };
}

function getFilterParams(filters: MetierFilters) {
  return {
    sort: filters.sort && filters.sort !== "libelle" ? filters.sort : undefined,
    search: filters.search,
    secteurIds: filters.secteurIds?.join(","),
    transitionEco:
      filters.transitionEco === undefined
        ? undefined
        : String(filters.transitionEco),
    transitionNum:
      filters.transitionNum === undefined
        ? undefined
        : String(filters.transitionNum),
    emploiCadre:
      filters.emploiCadre === undefined
        ? undefined
        : String(filters.emploiCadre),
  };
}

function getActiveFilterCount(filters: MetierFilters) {
  return [
    filters.sort && filters.sort !== "libelle",
    filters.search,
    filters.secteurIds?.length,
    filters.transitionEco !== undefined,
    filters.transitionNum !== undefined,
    filters.emploiCadre !== undefined,
  ].filter(Boolean).length;
}

function sortSecteurs(secteurs: Secteur[]) {
  return [...secteurs].sort((secteurA, secteurB) =>
    secteurA.libelle.localeCompare(secteurB.libelle),
  );
}

function useMetierFilters() {
  const params = useLocalSearchParams();
  const filters = useMemo(
    () => getFiltersFromParams(params),
    [
      params.sort,
      params.search,
      params.secteurIds,
      params.transitionEco,
      params.transitionNum,
      params.emploiCadre,
    ],
  );
  const secteurQuery = useQuery({
    queryKey: ["secteurs"],
    queryFn: apiListSecteurs,
  });
  const secteurs = useMemo(
    () => sortSecteurs(secteurQuery.data ?? []),
    [secteurQuery.data],
  );

  const applyFilters = (nextFilters: MetierFilters) => {
    router.push({
      pathname: "/metier",
      params: getFilterParams(nextFilters),
    });
  };

  const resetFilters = () => {
    router.push("/metier");
  };

  return {
    activeFilterCount: getActiveFilterCount(filters),
    applyFilters,
    filters,
    resetFilters,
    secteurs,
    secteursError: secteurQuery.error,
    secteursIsLoading: secteurQuery.isPending,
  };
}

export { useMetierFilters };
export type { MetierFilters };
