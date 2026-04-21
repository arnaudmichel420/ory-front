import { apiListMetiers } from "@/api/apiMetier";
import { MetierFiltersSheet } from "@/components/organisms/metier-filters";
import { MetierListItemCard } from "@/components/organisms/metier-list-item";
import { Text } from "@/components/ui/text";
import { useMetierFilters } from "@/hooks/use-metier-filters";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FlatList, RefreshControl, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MetierScreen() {
  const {
    activeFilterCount,
    applyFilters,
    filters,
    resetFilters,
    secteurs,
    secteursIsLoading,
  } = useMetierFilters();

  const {
    data,
    isPending,
    isRefetching,
    refetch,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["metiers", filters],
    queryFn: ({ pageParam }) =>
      apiListMetiers({ ...filters, page: pageParam, perPage: 20 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.meta.page + 1;
      return nextPage <= lastPage.meta.totalPages ? nextPage : undefined;
    },
  });

  const metiers = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        data={metiers}
        keyExtractor={(item) => item.codeOgr}
        contentContainerClassName="gap-4 px-6 py-6"
        refreshControl={
          <RefreshControl
            refreshing={isRefetching && !isFetchingNextPage}
            onRefresh={() => void refetch()}
          />
        }
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            void fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.2}
        ListHeaderComponent={
          <View className="gap-4">
            <View className="flex-row items-start justify-between gap-4">
              <View className="flex-1 gap-1">
                <Text variant="h3" className="text-left">
                  Metiers
                </Text>
                <Text className="text-muted-foreground">
                  Parcourez les metiers et ajoutez vos favoris avec le coeur.
                </Text>
              </View>

              <MetierFiltersSheet
                activeFilterCount={activeFilterCount}
                filters={filters}
                onApply={applyFilters}
                onReset={resetFilters}
                secteurs={secteurs}
                secteursIsLoading={secteursIsLoading}
              />
            </View>

            {error ? (
              <Text className="text-sm text-destructive">
                Impossible de charger la liste des metiers.
              </Text>
            ) : null}

            {isPending ? (
              <Text className="text-sm text-muted-foreground">
                Chargement des metiers...
              </Text>
            ) : null}
          </View>
        }
        ListEmptyComponent={
          !isPending && !error ? (
            <Text className="text-sm text-muted-foreground">
              Aucun metier disponible.
            </Text>
          ) : null
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <Text className="text-center text-sm text-muted-foreground">
              Chargement de metiers supplementaires...
            </Text>
          ) : null
        }
        renderItem={({ item }) => <MetierListItemCard metier={item} />}
      />
    </SafeAreaView>
  );
}
