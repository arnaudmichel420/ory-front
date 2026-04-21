import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { ROUTES } from "@/lib/routes";
import { THEME } from "@/lib/theme";
import { type MetierListItem } from "@/types/metier";
import { Link } from "expo-router";
import {
  BriefcaseBusinessIcon,
  CpuIcon,
  HeartIcon,
  LeafIcon,
} from "lucide-react-native";
import { type ReactNode } from "react";
import { Pressable, useColorScheme, View } from "react-native";

type MetierListItemProps = {
  metier: MetierListItem;
};

const SECTEUR_CARD_BACKGROUNDS: Record<string, string> = {
  "Activités juridiques et comptables": "bg-indigo-50 dark:bg-indigo-950/30",
  "Activités juridiques": "bg-indigo-50 dark:bg-indigo-950/30",
  Comptabilité: "bg-indigo-50 dark:bg-indigo-950/30",
  "Agriculture et élevage": "bg-emerald-50 dark:bg-emerald-950/30",
  "Agriculture, sylviculture": "bg-emerald-50 dark:bg-emerald-950/30",
  "Élevage, pêche": "bg-emerald-50 dark:bg-emerald-950/30",
  "Architecture, études et normes": "bg-cyan-50 dark:bg-cyan-950/30",
  Architecture: "bg-cyan-50 dark:bg-cyan-950/30",
  "Étude des sols et des bâtiments": "bg-cyan-50 dark:bg-cyan-950/30",
  Normes: "bg-cyan-50 dark:bg-cyan-950/30",
  "Artisanat d'art, audiovisuel et spectacle":
    "bg-fuchsia-50 dark:bg-fuchsia-950/30",
  "Artisanat d'art": "bg-fuchsia-50 dark:bg-fuchsia-950/30",
  Audiovisuel: "bg-fuchsia-50 dark:bg-fuchsia-950/30",
  Spectacle: "bg-fuchsia-50 dark:bg-fuchsia-950/30",
  Automobile: "bg-red-50 dark:bg-red-950/30",
  "Bâtiment et travaux publics (BTP)": "bg-orange-50 dark:bg-orange-950/30",
  BTP: "bg-orange-50 dark:bg-orange-950/30",
  "Gros Œuvre": "bg-orange-50 dark:bg-orange-950/30",
  "Second Œuvre": "bg-orange-50 dark:bg-orange-950/30",
  "Commerce et distribution": "bg-lime-50 dark:bg-lime-950/30",
  "Commerce de détail": "bg-lime-50 dark:bg-lime-950/30",
  "Commerce de gros": "bg-lime-50 dark:bg-lime-950/30",
  "Grande distribution": "bg-lime-50 dark:bg-lime-950/30",
  "Communication et marketing": "bg-blue-50 dark:bg-blue-950/30",
  "Culture et patrimoine": "bg-stone-50 dark:bg-stone-900/60",
  Édition: "bg-violet-50 dark:bg-violet-950/30",
  Énergie: "bg-yellow-50 dark:bg-yellow-950/30",
  "Enseignement et formation": "bg-sky-50 dark:bg-sky-950/30",
  "Conseil, orientation et formation": "bg-sky-50 dark:bg-sky-950/30",
  Enseignement: "bg-sky-50 dark:bg-sky-950/30",
  Environnement: "bg-green-50 dark:bg-green-950/30",
  "Finance, banque et assurance": "bg-purple-50 dark:bg-purple-950/30",
  Assurance: "bg-purple-50 dark:bg-purple-950/30",
  Banque: "bg-purple-50 dark:bg-purple-950/30",
  Finance: "bg-purple-50 dark:bg-purple-950/30",
  "Gestion administrative et ressources humaines":
    "bg-slate-50 dark:bg-slate-900/60",
  "Gestion administrative": "bg-slate-50 dark:bg-slate-900/60",
  "Ressources humaines": "bg-slate-50 dark:bg-slate-900/60",
  "Hôtellerie et restauration": "bg-rose-50 dark:bg-rose-950/30",
  Hôtellerie: "bg-rose-50 dark:bg-rose-950/30",
  Restauration: "bg-rose-50 dark:bg-rose-950/30",
  Immobilier: "bg-teal-50 dark:bg-teal-950/30",
  "Industrie - Alimentaire": "bg-amber-50 dark:bg-amber-950/30",
  "Industrie - Bois": "bg-lime-50 dark:bg-lime-950/30",
  "Industrie - Chimie": "bg-pink-50 dark:bg-pink-950/30",
  "Industrie - Électronique": "bg-cyan-50 dark:bg-cyan-950/30",
  "Industrie - Métallurgie": "bg-zinc-50 dark:bg-zinc-900/60",
  "Industrie - Papier et imprimerie": "bg-neutral-50 dark:bg-neutral-900/60",
  Imprimerie: "bg-neutral-50 dark:bg-neutral-900/60",
  Papier: "bg-neutral-50 dark:bg-neutral-900/60",
  "Industrie - Textile et mode": "bg-fuchsia-50 dark:bg-fuchsia-950/30",
  Industries: "bg-stone-50 dark:bg-stone-900/60",
  "Informatique et télécommunication": "bg-blue-50 dark:bg-blue-950/30",
  Informatique: "bg-blue-50 dark:bg-blue-950/30",
  Télécommunication: "bg-blue-50 dark:bg-blue-950/30",
  "Logistique et transport": "bg-teal-50 dark:bg-teal-950/30",
  "Logistique et courrier": "bg-teal-50 dark:bg-teal-950/30",
  Transport: "bg-teal-50 dark:bg-teal-950/30",
  "Maintenance, entretien et nettoyage": "bg-slate-50 dark:bg-slate-900/60",
  Maintenance: "bg-slate-50 dark:bg-slate-900/60",
  Nettoyage: "bg-slate-50 dark:bg-slate-900/60",
  Recherche: "bg-violet-50 dark:bg-violet-950/30",
  Santé: "bg-emerald-50 dark:bg-emerald-950/30",
  Médical: "bg-emerald-50 dark:bg-emerald-950/30",
  "Soins animaliers": "bg-emerald-50 dark:bg-emerald-950/30",
  "Service à la personne": "bg-pink-50 dark:bg-pink-950/30",
  "Service public, défense et sécurité": "bg-red-50 dark:bg-red-950/30",
  Défense: "bg-red-50 dark:bg-red-950/30",
  Sécurité: "bg-red-50 dark:bg-red-950/30",
  "Service public": "bg-red-50 dark:bg-red-950/30",
  Social: "bg-indigo-50 dark:bg-indigo-950/30",
  "Sport, animation et loisir": "bg-orange-50 dark:bg-orange-950/30",
  "Animation et loisir": "bg-orange-50 dark:bg-orange-950/30",
  Sport: "bg-orange-50 dark:bg-orange-950/30",
  Tourisme: "bg-cyan-50 dark:bg-cyan-950/30",
};

function getSecteurCardBackground(secteur?: string) {
  if (!secteur) {
    return undefined;
  }

  return SECTEUR_CARD_BACKGROUNDS[secteur];
}

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

function MetierListItemCard({ metier }: MetierListItemProps) {
  const colorScheme = useColorScheme();
  const theme = THEME[colorScheme === "dark" ? "dark" : "light"];
  const description =
    metier.description ?? "Description non disponible pour ce metier.";
  const secteurPrincipal = metier.secteurs.find(
    (secteur) => secteur.principal,
  )?.secteur;
  const secteur = secteurPrincipal?.libelle ?? "Secteur non renseigne";
  const secteurBackground = getSecteurCardBackground(secteurPrincipal?.libelle);

  return (
    <Link href={ROUTES.metierDetail(metier.codeOgr)} asChild>
      <Pressable>
        <Card className={secteurBackground}>
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

            <Text className="leading-6 text-muted-foreground" numberOfLines={3}>
              {description}
            </Text>

            <View className="flex-row items-center justify-between gap-4">
              <Text className="flex-1 text-sm font-medium text-foreground">
                {secteur}
              </Text>

              <View className="p-2">
                <HeartIcon
                  size={18}
                  color={theme.destructive}
                  fill={theme.destructive}
                />
              </View>
            </View>
          </CardContent>
        </Card>
      </Pressable>
    </Link>
  );
}

export { MetierListItemCard };
