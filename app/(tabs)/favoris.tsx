import { apiListSavedMetiers } from "@/api/apiMetier";
import { MetierListItemCard } from "@/components/organisms/metier-list-item";
import { Text } from "@/components/ui/text";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FlatList, RefreshControl, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FavorisScreen() {
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
    queryKey: ["metiers", "saved"],
    queryFn: ({ pageParam }) =>
      apiListSavedMetiers({ page: pageParam, limit: 20 }),
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
            <View className="gap-1">
              <Text variant="h3" className="text-left">
                Favoris
              </Text>
              <Text className="text-muted-foreground">
                Retrouvez ici les metiers que vous avez sauvegardes.
              </Text>
            </View>

            {error ? (
              <Text className="text-sm text-destructive">
                Impossible de charger la liste des favoris.
              </Text>
            ) : null}

            {isPending ? (
              <Text className="text-sm text-muted-foreground">
                Chargement des favoris...
              </Text>
            ) : null}
          </View>
        }
        ListEmptyComponent={
          !isPending && !error ? (
            <Text className="text-sm text-muted-foreground">
              Aucun favori enregistre.
            </Text>
          ) : null
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <Text className="text-center text-sm text-muted-foreground">
              Chargement de favoris supplementaires...
            </Text>
          ) : null
        }
        renderItem={({ item }) => (
          <MetierListItemCard metier={item} savedOverride />
        )}
      />
    </SafeAreaView>
  );
}
