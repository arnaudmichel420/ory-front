import {
  MetierDetailGroupedList,
  type MetierDetailGroupedListGroup,
} from "@/components/organisms/metier-detail-grouped-list";
import { MetierDetailSection } from "@/components/organisms/metier-detail-section";
import { Icon } from "@/components/ui/icon";
import {
  type ContexteTravailType,
  type MetierContexteTravail,
  type MetierDetail,
} from "@/types/metier";
import {
  BriefcaseBusinessIcon,
  Building2Icon,
  ClockIcon,
  MapPinIcon,
  ShieldAlertIcon,
  UserCheckIcon,
  UsersRoundIcon,
} from "lucide-react-native";
import { useMemo } from "react";

const CONTEXTE_TRAVAIL_TYPE_CONFIG: Record<
  ContexteTravailType,
  {
    title: string;
    icon: React.ComponentProps<typeof Icon>["as"];
  }
> = {
  "Conditions de travail et risques professionnels": {
    title: "Conditions de travail et risques professionnels",
    icon: ShieldAlertIcon,
  },
  "Horaires et durée du travail": {
    title: "Horaires et durée du travail",
    icon: ClockIcon,
  },
  "Lieux et déplacements": {
    title: "Lieux et déplacements",
    icon: MapPinIcon,
  },
  "Publics spécifiques": {
    title: "Publics spécifiques",
    icon: UsersRoundIcon,
  },
  "Statut d'emploi": {
    title: "Statut d'emploi",
    icon: UserCheckIcon,
  },
  "Types de structures": {
    title: "Types de structures",
    icon: Building2Icon,
  },
  unknown: {
    title: "Autres contextes",
    icon: BriefcaseBusinessIcon,
  },
} as const;

function getContexteTravailGroups(
  detail: MetierDetail,
): MetierDetailGroupedListGroup[] {
  return (Object.keys(CONTEXTE_TRAVAIL_TYPE_CONFIG) as ContexteTravailType[])
    .map((type) => {
      const visibleItems = (detail.contextesTravail[type] ?? [])
        .filter((item: MetierContexteTravail) =>
          Boolean(item.contexteTravail.libelle ?? item.libelleGroupe),
        )
        .slice(0, 5)
        .map((item: MetierContexteTravail) => ({
          id:
            item.id ??
            `${type}-${item.contexteTravail.codeOgr ?? item.contexteTravail.libelle ?? item.libelleGroupe}`,
          libelle: item.contexteTravail.libelle ?? item.libelleGroupe ?? "",
        }));

      const config = CONTEXTE_TRAVAIL_TYPE_CONFIG[type];

      return {
        key: type,
        title: config.title,
        icon: config.icon,
        items: visibleItems,
      };
    })
    .filter((group) => group.items.length > 0);
}

type MetierDetailContextesProps = {
  metier: MetierDetail;
};

function MetierDetailContextes({ metier }: MetierDetailContextesProps) {
  const contexteGroups = useMemo(
    () => getContexteTravailGroups(metier),
    [metier],
  );

  if (!contexteGroups.length) {
    return null;
  }

  return (
    <MetierDetailSection
      title="Contextes de travail"
      icon={BriefcaseBusinessIcon}
    >
      <MetierDetailGroupedList groups={contexteGroups} />
    </MetierDetailSection>
  );
}

export { MetierDetailContextes };
