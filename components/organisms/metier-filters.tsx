import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { type MetierFilters } from "@/hooks/use-metier-filters";
import { type MetierSort, type Secteur } from "@/types/metier";
import {
  BriefcaseBusinessIcon,
  CheckIcon,
  ChevronDownIcon,
  CpuIcon,
  LeafIcon,
  SlidersHorizontalIcon,
  XIcon,
} from "lucide-react-native";
import { type ComponentType, useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, View } from "react-native";

type MetierFiltersSheetProps = {
  activeFilterCount: number;
  filters: MetierFilters;
  secteurs: Secteur[];
  secteursIsLoading: boolean;
  onApply: (filters: MetierFilters) => void;
  onReset: () => void;
};

type BooleanFilterKey = "transitionEco" | "transitionNum" | "emploiCadre";

type FilterIcon = ComponentType<{
  size?: number;
  className?: string;
}>;

const SORT_OPTIONS: Array<{ label: string; value: MetierSort }> = [
  { label: "A-Z", value: "libelle" },
  { label: "Z-A", value: "-libelle" },
];

const BOOLEAN_FILTERS: Array<{
  icon: FilterIcon;
  iconClassName: string;
  label: string;
  key: BooleanFilterKey;
  wrapperClassName: string;
}> = [
  {
    icon: LeafIcon,
    iconClassName: "text-emerald-600 dark:text-emerald-300",
    label: "Transition ecologique",
    key: "transitionEco",
    wrapperClassName: "bg-emerald-100 dark:bg-emerald-950/50",
  },
  {
    icon: CpuIcon,
    iconClassName: "text-sky-600 dark:text-sky-300",
    label: "Transition numerique",
    key: "transitionNum",
    wrapperClassName: "bg-sky-100 dark:bg-sky-950/50",
  },
  {
    icon: BriefcaseBusinessIcon,
    iconClassName: "text-amber-700 dark:text-amber-300",
    label: "Emploi cadre",
    key: "emploiCadre",
    wrapperClassName: "bg-amber-100 dark:bg-amber-950/50",
  },
];

function getSelectedSecteurLabels(
  secteurIds: number[] | undefined,
  secteurs: Secteur[],
) {
  if (!secteurIds?.length) {
    return "Tous les secteurs";
  }

  const secteurLabels = secteurIds.map((secteurId) => {
    const secteur = secteurs.find((item) => item.id === secteurId);
    return secteur?.libelle ?? `Secteur ${secteurId}`;
  });

  return secteurLabels.join(", ");
}

function SecteurSelect({
  secteurIds,
  secteurs,
  secteursIsLoading,
  onChange,
}: {
  secteurIds: number[] | undefined;
  secteurs: Secteur[];
  secteursIsLoading: boolean;
  onChange: (secteurIds: number[] | undefined) => void;
}) {
  const [open, setOpen] = useState(false);
  const selectedSecteurIds = secteurIds ?? [];

  const toggleSecteur = (secteurId: number) => {
    const nextSecteurIds = selectedSecteurIds.includes(secteurId)
      ? selectedSecteurIds.filter((selectedId) => selectedId !== secteurId)
      : [...selectedSecteurIds, secteurId];

    onChange(nextSecteurIds.length > 0 ? nextSecteurIds : undefined);
  };

  return (
    <>
      <Pressable
        className="min-h-10 flex-row items-center justify-between gap-3 rounded-md border border-input bg-background px-3 py-2"
        onPress={() => setOpen(true)}
      >
        <Text className="flex-1 text-sm" numberOfLines={1}>
          {getSelectedSecteurLabels(secteurIds, secteurs)}
        </Text>
        <ChevronDownIcon size={18} className="text-muted-foreground" />
      </Pressable>

      <Modal
        visible={open}
        animationType="slide"
        transparent
        onRequestClose={() => setOpen(false)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <Pressable className="flex-1" onPress={() => setOpen(false)} />
          <View className="max-h-[76%] rounded-t-3xl bg-background">
            <View className="flex-row items-center justify-between border-b border-border px-6 py-4">
              <Text className="text-lg font-semibold">Secteurs</Text>
              <Button
                variant="ghost"
                size="icon"
                onPress={() => setOpen(false)}
              >
                <XIcon size={20} className="text-foreground" />
              </Button>
            </View>

            <ScrollView
              contentContainerClassName="gap-2 px-6 py-5"
              showsVerticalScrollIndicator={false}
            >
              <Button
                variant="outline"
                className="justify-start"
                onPress={() => onChange(undefined)}
              >
                <Text>Tous les secteurs</Text>
              </Button>

              {secteursIsLoading ? (
                <Text className="py-3 text-sm text-muted-foreground">
                  Chargement des secteurs...
                </Text>
              ) : null}

              {!secteursIsLoading && secteurs.length === 0 ? (
                <Text className="py-3 text-sm text-muted-foreground">
                  Aucun secteur disponible.
                </Text>
              ) : null}

              {secteurs.map((secteur) => {
                const selected = selectedSecteurIds.includes(secteur.id);

                return (
                  <Pressable
                    key={secteur.id}
                    className="min-h-11 flex-row items-center justify-between gap-3 rounded-md border border-border px-3 py-2 active:bg-accent"
                    onPress={() => toggleSecteur(secteur.id)}
                  >
                    <Text className="flex-1 text-sm">{secteur.libelle}</Text>
                    {selected ? (
                      <CheckIcon size={18} className="text-primary" />
                    ) : null}
                  </Pressable>
                );
              })}
            </ScrollView>

            <View className="border-t border-border px-6 py-4">
              <Button onPress={() => setOpen(false)}>
                <Text>Valider</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

function MetierFiltersSheet({
  activeFilterCount,
  filters,
  secteurs,
  secteursIsLoading,
  onApply,
  onReset,
}: MetierFiltersSheetProps) {
  const [open, setOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState<MetierFilters>(filters);

  useEffect(() => {
    setDraftFilters(filters);
  }, [filters]);

  const setBooleanFilter = (key: BooleanFilterKey, checked: boolean) => {
    setDraftFilters((currentFilters) => ({
      ...currentFilters,
      [key]: checked ? true : undefined,
    }));
  };

  const applyFilters = () => {
    onApply({
      ...draftFilters,
      search: draftFilters.search?.trim() || undefined,
    });
    setOpen(false);
  };

  const resetFilters = () => {
    setDraftFilters({ sort: "libelle" });
    setOpen(false);
    onReset();
  };

  return (
    <>
      <Button
        variant="outline"
        className="flex-row items-center gap-2"
        onPress={() => setOpen(true)}
      >
        <SlidersHorizontalIcon size={16} className="text-foreground" />
        <Text>Filtres{activeFilterCount ? ` (${activeFilterCount})` : ""}</Text>
      </Button>

      <Modal
        visible={open}
        animationType="slide"
        transparent
        onRequestClose={() => setOpen(false)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <Pressable className="flex-1" onPress={() => setOpen(false)} />
          <View className="max-h-[86%] rounded-t-3xl bg-background">
            <View className="flex-row items-center justify-between border-b border-border px-6 py-4">
              <Text className="text-lg font-semibold">Filtres</Text>
              <Button
                variant="ghost"
                size="icon"
                onPress={() => setOpen(false)}
              >
                <XIcon size={20} className="text-foreground" />
              </Button>
            </View>

            <ScrollView
              contentContainerClassName="gap-6 px-6 py-5"
              showsVerticalScrollIndicator={false}
            >
              <View className="gap-3">
                <Label>Recherche</Label>
                <Input
                  value={draftFilters.search ?? ""}
                  onChangeText={(value) =>
                    setDraftFilters((currentFilters) => ({
                      ...currentFilters,
                      search: value.slice(0, 255),
                    }))
                  }
                  placeholder="Libelle ou mot-cle"
                  returnKeyType="search"
                />
              </View>

              <View className="gap-3">
                <Label>Tri</Label>
                <View className="flex-row gap-2">
                  {SORT_OPTIONS.map((option) => (
                    <Button
                      key={option.value}
                      variant={
                        draftFilters.sort === option.value
                          ? "default"
                          : "outline"
                      }
                      className="flex-1"
                      onPress={() =>
                        setDraftFilters((currentFilters) => ({
                          ...currentFilters,
                          sort: option.value,
                        }))
                      }
                    >
                      <Text>{option.label}</Text>
                    </Button>
                  ))}
                </View>
              </View>

              <View className="gap-3">
                <Label>Secteurs</Label>
                <SecteurSelect
                  secteurIds={draftFilters.secteurIds}
                  secteurs={secteurs}
                  secteursIsLoading={secteursIsLoading}
                  onChange={(secteurIds) =>
                    setDraftFilters((currentFilters) => ({
                      ...currentFilters,
                      secteurIds,
                    }))
                  }
                />
              </View>

              <View className="gap-3">
                {BOOLEAN_FILTERS.map(
                  ({
                    icon: FilterIcon,
                    iconClassName,
                    key,
                    label,
                    wrapperClassName,
                  }) => (
                    <View
                      key={key}
                      className="flex-row items-center justify-between gap-4 rounded-md border border-border px-3 py-3"
                    >
                      <View className="flex-1 flex-row items-center gap-3">
                        <View className={`rounded-full p-2 ${wrapperClassName}`}>
                          <FilterIcon size={16} className={iconClassName} />
                        </View>
                        <Text className="flex-1 text-sm font-medium">
                          {label}
                        </Text>
                      </View>
                      <Switch
                        checked={draftFilters[key] === true}
                        onCheckedChange={(checked) =>
                          setBooleanFilter(key, checked)
                        }
                      />
                    </View>
                  ),
                )}
              </View>
            </ScrollView>

            <View className="flex-row gap-3 border-t border-border px-6 py-4">
              <Button
                variant="outline"
                className="flex-1"
                onPress={resetFilters}
              >
                <Text>Reinitialiser</Text>
              </Button>
              <Button className="flex-1" onPress={applyFilters}>
                <Text>Appliquer</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

export { MetierFiltersSheet };
