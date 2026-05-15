import { apiListMetiers } from "@/api/apiMetier";
import { MetierInfiniteList } from "@/components/organisms/metier-infinite-list";
import { MetierFiltersSheet } from "@/components/organisms/metier-filters";
import { useMetierFilters } from "@/hooks/use-metier-filters";

export default function MetierScreen() {
  const {
    activeFilterCount,
    applyFilters,
    filters,
    resetFilters,
    secteurs,
    secteursIsLoading,
  } = useMetierFilters();

  return (
    <MetierInfiniteList
      queryKey={["metiers", filters]}
      queryFn={(page) => apiListMetiers({ ...filters, page, perPage: 20 })}
      title="Metiers"
      description="Parcourez les metiers et ajoutez vos favoris avec le coeur."
      errorMessage="Impossible de charger la liste des metiers."
      loadingMessage="Chargement des metiers..."
      emptyMessage="Aucun metier disponible."
      loadingMoreMessage="Chargement de metiers supplementaires..."
      headerAccessory={
        <MetierFiltersSheet
          activeFilterCount={activeFilterCount}
          filters={filters}
          onApply={applyFilters}
          onReset={resetFilters}
          secteurs={secteurs}
          secteursIsLoading={secteursIsLoading}
        />
      }
    />
  );
}
