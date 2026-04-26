import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { getMetierSecteurBackground } from "@/lib/metier-secteur-theme";
import { type MetierDetail } from "@/types/metier";
import { router } from "expo-router";
import { ChevronLeftIcon } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type MetierDetailNavigationHeaderProps = {
  metier: MetierDetail;
};

function MetierDetailNavigationHeader({
  metier,
}: MetierDetailNavigationHeaderProps) {
  const backgroundClassName =
    getMetierSecteurBackground({
      secteurs: metier.secteurs,
      sousDomaineLibelle: metier.sousDomaine?.libelle,
    }) ?? "bg-secondary";

  return (
    <SafeAreaView
      edges={["top"]}
      className={`${backgroundClassName} border-b border-border/50`}
    >
      <View className="px-4 pb-4 pt-2">
        <View className="flex-row items-start">
          <Pressable
            accessibilityLabel="Retour"
            className="mt-1 rounded-full bg-background/80 p-2 dark:bg-background/20"
            hitSlop={8}
            onPress={() => {
              router.back();
            }}
          >
            <Icon as={ChevronLeftIcon} size={18} className="text-foreground" />
          </Pressable>

          <View className="flex-1 px-3 pt-1">
            <Text
              className="text-xl text-center font-semibold text-foreground"
              numberOfLines={2}
            >
              {metier.libelle}
            </Text>
          </View>

          <View className="mt-1 h-10 w-10" />
        </View>
      </View>
    </SafeAreaView>
  );
}

export { MetierDetailNavigationHeader };
