import { apiListRecommendedMetiers } from "@/api/apiMetier";
import { MetierInfiniteList } from "@/components/organisms/metier-infinite-list";

export default function RecommandationsScreen() {
  return (
    <MetierInfiniteList
      queryKey={["metiers", "recommended"]}
      queryFn={(page) => apiListRecommendedMetiers({ page, limit: 20 })}
      title="Recommandations"
      description="Decouvrez les metiers recommandes a partir de vos favoris."
      errorMessage="Impossible de charger la liste des recommandations."
      loadingMessage="Chargement des recommandations..."
      emptyMessage="Aucune recommandation disponible."
      loadingMoreMessage="Chargement de recommandations supplementaires..."
    />
  );
}
