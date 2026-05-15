import { apiListSavedMetiers } from "@/api/apiMetier";
import { MetierInfiniteList } from "@/components/organisms/metier-infinite-list";

export default function FavorisScreen() {
  return (
    <MetierInfiniteList
      queryKey={["metiers", "saved"]}
      queryFn={(page) => apiListSavedMetiers({ page, limit: 20 })}
      title="Favoris"
      description="Retrouvez ici les metiers que vous avez sauvegardes."
      errorMessage="Impossible de charger la liste des favoris."
      loadingMessage="Chargement des favoris..."
      emptyMessage="Aucun favori enregistre."
      loadingMoreMessage="Chargement de favoris supplementaires..."
    />
  );
}
