import {
  MetierDetailGroupedList,
  type MetierDetailGroupedListGroup,
} from "@/components/organisms/metier-detail-grouped-list";
import { MetierDetailSection } from "@/components/organisms/metier-detail-section";
import { Icon } from "@/components/ui/icon";
import {
  type CompetenceItem,
  type MetierCompetenceType,
  type MetierDetail,
} from "@/types/metier";
import {
  BookOpenIcon,
  BriefcaseBusinessIcon,
  ListTreeIcon,
  UserRoundIcon,
} from "lucide-react-native";
import { useMemo } from "react";

const COMPETENCE_TYPE_CONFIG: Record<
  MetierCompetenceType,
  {
    title: string;
    icon: React.ComponentProps<typeof Icon>["as"];
  }
> = {
  savoir_faire: {
    title: "Savoir faire",
    icon: BriefcaseBusinessIcon,
  },
  savoir_etre_professionel: {
    title: "Savoir être professionel",
    icon: UserRoundIcon,
  },
  savoir: {
    title: "Savoir",
    icon: BookOpenIcon,
  },
} as const;

function getCompetenceGroups(
  detail: MetierDetail,
): MetierDetailGroupedListGroup[] {
  return (Object.keys(COMPETENCE_TYPE_CONFIG) as MetierCompetenceType[])
    .map((type) => {
      const visibleItems = (detail.competences[type] ?? [])
        .filter((item: CompetenceItem) => Boolean(item.competence.libelle))
        .map((item: CompetenceItem) => ({
          id:
            item.id ??
            `${type}-${item.competence.codeOgr ?? item.competence.libelle}`,
          libelle: item.competence.libelle ?? "",
          highlighted: Boolean(item.coeurMetier),
        }));

      const config = COMPETENCE_TYPE_CONFIG[type];

      return {
        key: type,
        title: config.title,
        icon: config.icon,
        items: visibleItems,
      };
    })
    .filter((group) => group.items.length > 0);
}

type MetierDetailCompetencesProps = {
  metier: MetierDetail;
};

function MetierDetailCompetences({ metier }: MetierDetailCompetencesProps) {
  const competenceGroups = useMemo(() => getCompetenceGroups(metier), [metier]);

  if (!competenceGroups.length) {
    return null;
  }

  return (
    <MetierDetailSection title="Competences" icon={ListTreeIcon}>
      <MetierDetailGroupedList groups={competenceGroups} />
    </MetierDetailSection>
  );
}

export { MetierDetailCompetences };
