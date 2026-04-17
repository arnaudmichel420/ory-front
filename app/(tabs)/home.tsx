import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { ROUTES } from "@/lib/routes";
import { Link } from "expo-router";
import {
  ShieldCheckIcon,
  SparklesIcon,
  WalletCardsIcon,
} from "lucide-react-native";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FEATURES = [
  {
    title: "Connexion ultra rapide",
    description:
      "Un parcours simple, pensé mobile, avec des écrans lisibles et rassurants.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Création de compte claire",
    description:
      "Une structure en cartes avec des champs bien espacés pour une maquette propre.",
    icon: WalletCardsIcon,
  },
  {
    title: "Style cohérent",
    description:
      "Palette douce, composants réutilisables et navigation basse prête à brancher.",
    icon: SparklesIcon,
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-8 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="rounded-[28px] bg-primary px-6 py-7">
          <Text className="text-sm font-semibold uppercase tracking-[2px] text-primary-foreground/70">
            Ory Front
          </Text>
          <Text
            variant="h1"
            className="mt-4 text-left text-3xl text-primary-foreground"
          >
            Une base de maquettes auth prêtes a brancher.
          </Text>
          <Text className="mt-4 text-base leading-6 text-primary-foreground/80">
            Trois onglets en bas, un ecran d&apos;accueil et deux parcours
            visuels pour la connexion et l&apos;inscription.
          </Text>
          <View className="mt-6 flex-row gap-3">
            <Link href={ROUTES.login} asChild>
              <Button className="flex-1 bg-background">
                <Text className="text-foreground">Se connecter</Text>
              </Button>
            </Link>
            <Link href={ROUTES.register} asChild>
              <Button
                variant="outline"
                className="flex-1 border-primary-foreground/30 bg-transparent"
              >
                <Text className="text-primary-foreground">Creer un compte</Text>
              </Button>
            </Link>
          </View>
        </View>

        <View className="mt-6 gap-4">
          {FEATURES.map(({ title, description, icon: FeatureIcon }) => (
            <Card key={title} className="rounded-[24px]">
              <CardHeader className="gap-0">
                <View className="mb-4 h-12 w-12 items-center justify-center rounded-2xl bg-secondary">
                  <Icon as={FeatureIcon} size={22} />
                </View>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-6">
                  {description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
