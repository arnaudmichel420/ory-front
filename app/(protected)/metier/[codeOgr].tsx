import { apiCreateMetierInteraction, apiGetMetier } from "@/api/apiMetier";
import { QueryGuard } from "@/components/molecules/query-guard";
import { MetierDetailAcces } from "@/components/organisms/metier-detail-acces";
import { MetierDetailCompetences } from "@/components/organisms/metier-detail-competences";
import { MetierDetailContextes } from "@/components/organisms/metier-detail-contextes";
import { MetierDetailDomaines } from "@/components/organisms/metier-detail-domaines";
import { MetierDetailHeader } from "@/components/organisms/metier-detail-header";
import { MetierDetailNavigationHeader } from "@/components/organisms/metier-detail-navigation-header";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MetierDetailScreen() {
  const params = useLocalSearchParams<{ codeOgr?: string | string[] }>();
  const codeOgrParam = params.codeOgr;
  const codeOgr =
    typeof codeOgrParam === "string" ? codeOgrParam : codeOgrParam?.[0];
  const sentViewInteractionRef = useRef<string | null>(null);

  const {
    data: metier,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["metier", codeOgr],
    queryFn: () => apiGetMetier(codeOgr ?? ""),
    enabled: Boolean(codeOgr),
  });

  const interactionMutation = useMutation({
    mutationFn: () =>
      apiCreateMetierInteraction(codeOgr ?? "", {
        type: "vue",
      }),
  });

  useEffect(() => {
    if (!codeOgr || !metier) {
      return;
    }

    if (sentViewInteractionRef.current === codeOgr) {
      return;
    }

    sentViewInteractionRef.current = codeOgr;
    interactionMutation.mutate();
  }, [codeOgr, interactionMutation, metier]);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["left", "right"]}>
      <Stack.Screen
        options={{
          title: metier?.libelle ?? "Metier",
          header: metier
            ? () => <MetierDetailNavigationHeader metier={metier} />
            : undefined,
        }}
      />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-10 pt-6"
        showsVerticalScrollIndicator={false}
      >
        <QueryGuard
          queries={[{ isLoading, error }]}
          loadingMessage="Chargement du metier..."
          errorMessage="Impossible de charger le metier."
        >
          {metier ? (
            <View className="gap-8">
              <MetierDetailHeader metier={metier} />
              <MetierDetailAcces metier={metier} />
              <MetierDetailDomaines metier={metier} />
              <MetierDetailCompetences metier={metier} />
              <MetierDetailContextes metier={metier} />
            </View>
          ) : null}
        </QueryGuard>
      </ScrollView>
    </SafeAreaView>
  );
}
