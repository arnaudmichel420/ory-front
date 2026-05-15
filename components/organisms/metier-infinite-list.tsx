import { MetierListItemCard } from "@/components/organisms/metier-list-item";
import { Text } from "@/components/ui/text";
import { type MetierListResponse } from "@/types/metier";
import {
  type InfiniteData,
  type QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { type ReactNode } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type MetierInfiniteListProps = {
  queryKey: QueryKey;
  queryFn: (page: number) => Promise<MetierListResponse>;
  title: string;
  description: string;
  errorMessage: string;
  loadingMessage: string;
  emptyMessage: string;
  loadingMoreMessage: string;
  headerAccessory?: ReactNode;
};

function MetierInfiniteList({
  queryKey,
  queryFn,
  title,
  description,
  errorMessage,
  loadingMessage,
  emptyMessage,
  loadingMoreMessage,
  headerAccessory,
}: MetierInfiniteListProps) {
  const {
    data,
    isPending,
    isRefetching,
    refetch,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery<
    MetierListResponse,
    Error,
    InfiniteData<MetierListResponse>,
    QueryKey,
    number
  >({
    queryKey,
    queryFn: ({ pageParam }) => queryFn(pageParam),
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
                  {title}
                </Text>
                <Text className="text-muted-foreground">{description}</Text>
              </View>

              {headerAccessory}
            </View>

            {error ? (
              <Text className="text-sm text-destructive">{errorMessage}</Text>
            ) : null}

            {isPending ? (
              <Text className="text-sm text-muted-foreground">
                {loadingMessage}
              </Text>
            ) : null}
          </View>
        }
        ListEmptyComponent={
          !isPending && !error ? (
            <Text className="text-sm text-muted-foreground">
              {emptyMessage}
            </Text>
          ) : null
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <Text className="text-center text-sm text-muted-foreground">
              {loadingMoreMessage}
            </Text>
          ) : null
        }
        renderItem={({ item }) => <MetierListItemCard metier={item} />}
      />
    </SafeAreaView>
  );
}

export { MetierInfiniteList };
