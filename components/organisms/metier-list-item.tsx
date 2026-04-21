import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { ROUTES } from "@/lib/routes";
import { type MetierListItem } from "@/types/metier";
import { Link } from "expo-router";
import {
  BriefcaseBusinessIcon,
  CpuIcon,
  HeartIcon,
  LeafIcon,
} from "lucide-react-native";
import { type ReactNode } from "react";
import { Pressable, View } from "react-native";

type MetierListItemProps = {
  metier: MetierListItem;
};

function FlagIcon({
  visible,
  className,
  children,
}: {
  visible: boolean | null;
  className: string;
  children: ReactNode;
}) {
  if (!visible) {
    return null;
  }

  return <View className={className}>{children}</View>;
}

function MetierListItemCard({
  metier,
}: MetierListItemProps) {
  const description =
    metier.description ?? "Description non disponible pour ce metier.";
  const secteurPrincipal =
    metier.secteurs.find((secteur) => secteur.principal)?.secteur;
  const secteur = secteurPrincipal?.libelle ?? "Secteur non renseigne";

  return (
    <Link href={ROUTES.metierDetail(metier.codeOgr)} asChild>
      <Pressable>
        <Card>
          <CardContent className="gap-4 py-5">
            <View className="flex-row items-start justify-between gap-4">
              <View className="flex-1 gap-1">
                <Text className="text-lg font-semibold text-foreground">
                  {metier.libelle}
                </Text>
              </View>

              <View className="flex-row items-center gap-2">
                <FlagIcon
                  visible={metier.transitionNum}
                  className="rounded-full bg-sky-100 p-2 dark:bg-sky-950/50"
                >
                  <CpuIcon
                    size={16}
                    className="text-sky-600 dark:text-sky-300"
                  />
                </FlagIcon>
                <FlagIcon
                  visible={metier.transitionEco}
                  className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-950/50"
                >
                  <LeafIcon
                    size={16}
                    className="text-emerald-600 dark:text-emerald-300"
                  />
                </FlagIcon>
                <FlagIcon
                  visible={metier.emploiCadre}
                  className="rounded-full bg-amber-100 p-2 dark:bg-amber-950/50"
                >
                  <BriefcaseBusinessIcon
                    size={16}
                    className="text-amber-700 dark:text-amber-300"
                  />
                </FlagIcon>
              </View>
            </View>

            <Text
              className="leading-6 text-muted-foreground"
              numberOfLines={3}
            >
              {description}
            </Text>

            <View className="flex-row items-center justify-between gap-4">
              <Text className="flex-1 text-sm font-medium text-foreground">
                {secteur}
              </Text>

              <View className="rounded-full border border-border p-2">
                <HeartIcon size={18} className="text-muted-foreground" />
              </View>
            </View>
          </CardContent>
        </Card>
      </Pressable>
    </Link>
  );
}

export { MetierListItemCard };
