import { MetierSaveButton } from "@/components/molecules/metier-save-button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { type MetierDetail } from "@/types/metier";
import {
  BadgeCheckIcon,
  BriefcaseBusinessIcon,
  CpuIcon,
  LeafIcon,
} from "lucide-react-native";
import { View } from "react-native";

type StatusChipProps = {
  icon: React.ComponentProps<typeof Icon>["as"];
  label: string;
  tone: string;
};

function StatusChip({ icon, label, tone }: StatusChipProps) {
  return (
    <View className={`flex-row items-center gap-2 rounded-full px-4 py-2 ${tone}`}>
      <Icon as={icon} size={16} />
      <Text className="text-sm font-medium text-foreground">{label}</Text>
    </View>
  );
}

type MetierDetailHeaderProps = {
  metier: MetierDetail;
};

function MetierDetailHeader({ metier }: MetierDetailHeaderProps) {
  const statusChips = [
    metier.transitionNum
      ? {
          key: "transition-num",
          label: "Transition numerique",
          icon: CpuIcon,
          tone: "bg-sky-100 dark:bg-sky-950/50",
        }
      : null,
    metier.transitionEco
      ? {
          key: "transition-eco",
          label: "Transition ecologique",
          icon: LeafIcon,
          tone: "bg-emerald-100 dark:bg-emerald-950/50",
        }
      : null,
    metier.emploiCadre
      ? {
          key: "emploi-cadre",
          label: "Emploi cadre",
          icon: BriefcaseBusinessIcon,
          tone: "bg-amber-100 dark:bg-amber-950/50",
        }
      : null,
    metier.emploiReglemente
      ? {
          key: "emploi-reglemente",
          label: "Emploi reglemente",
          icon: BadgeCheckIcon,
          tone: "bg-violet-100 dark:bg-violet-950/50",
        }
      : null,
  ].filter((chip) => chip !== null);

  return (
    <View className="gap-6 border-b border-border/70 pb-8">
      <View className="flex-row items-start justify-between gap-4">
        <View className="flex-1 gap-3">
          <Text variant="h1" className="text-left text-3xl">
            {metier.libelle}
          </Text>
          {metier.definition ? (
            <Text className="leading-7 text-muted-foreground">
              {metier.definition}
            </Text>
          ) : null}
        </View>

        <MetierSaveButton codeOgr={metier.codeOgr} initialSaved={metier.saved} />
      </View>

      {statusChips.length ? (
        <View className="flex-row flex-wrap gap-2">
          {statusChips.map((chip) => (
            <StatusChip
              key={chip.key}
              icon={chip.icon}
              label={chip.label}
              tone={chip.tone}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}

export { MetierDetailHeader };
