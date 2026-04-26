import { MetierDetailBulletList } from "@/components/organisms/metier-detail-bullet-list";
import { MetierDetailSection } from "@/components/organisms/metier-detail-section";
import { Text } from "@/components/ui/text";
import { type MetierDetail } from "@/types/metier";
import { ShapesIcon } from "lucide-react-native";
import { useMemo } from "react";
import { View } from "react-native";

function getMainAndSecondaryLabels(detail: MetierDetail) {
  const orderedSecteurs = [...detail.secteurs]
    .filter((entry) => entry.secteur?.libelle)
    .sort((left, right) => Number(right.principal) - Number(left.principal));

  const secteurLabels = orderedSecteurs
    .map((entry) => entry.secteur?.libelle)
    .filter((label): label is string => Boolean(label));

  const mainLabel = detail.sousDomaine?.libelle ?? secteurLabels[0] ?? null;
  const secondaryLabels = mainLabel
    ? secteurLabels.filter((label) => label !== mainLabel)
    : secteurLabels;

  return { mainLabel, secondaryLabels };
}

type MetierDetailDomainesProps = {
  metier: MetierDetail;
};

function MetierDetailDomaines({ metier }: MetierDetailDomainesProps) {
  const { mainLabel, secondaryLabels } = useMemo(
    () => getMainAndSecondaryLabels(metier),
    [metier],
  );

  if (!mainLabel && !secondaryLabels.length) {
    return null;
  }

  return (
    <MetierDetailSection title="Domaine et secteurs" icon={ShapesIcon}>
      {mainLabel ? (
        <View className="gap-1">
          <Text className="text-xs font-semibold uppercase tracking-[1px] text-muted-foreground">
            Domaine principal
          </Text>
          <Text className="text-lg font-semibold text-foreground">
            {mainLabel}
          </Text>
        </View>
      ) : null}

      {secondaryLabels.length ? (
        <View className="gap-3">
          <Text className="text-xs font-semibold uppercase tracking-[1px] text-muted-foreground">
            Domaines secondaires
          </Text>
          <MetierDetailBulletList items={secondaryLabels} />
        </View>
      ) : null}
    </MetierDetailSection>
  );
}

export { MetierDetailDomaines };
