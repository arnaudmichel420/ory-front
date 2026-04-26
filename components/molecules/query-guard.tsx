import { getQueryErrorMessage } from "@/lib/get-query-error-message";
import { Text } from "@/components/ui/text";
import { ActivityIndicator, View } from "react-native";

type QueryGuardItem = {
  isLoading: boolean;
  error: unknown;
};

type QueryGuardProps = React.PropsWithChildren<{
  queries: QueryGuardItem[];
  loadingMessage?: string;
  errorMessage?: string;
  className?: string;
}>;

function QueryGuard({
  children,
  queries,
  loadingMessage = "Chargement...",
  errorMessage = "Impossible de charger les donnees.",
  className,
}: QueryGuardProps) {
  const isLoading = queries.some((query) => query.isLoading);
  const error = queries.find((query) => query.error)?.error;

  if (isLoading) {
    return (
      <View className={className}>
        <View className="items-center justify-center gap-3 py-8">
          <ActivityIndicator size="large" />
          <Text className="text-sm text-muted-foreground">
            {loadingMessage}
          </Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View className={className}>
        <Text className="text-sm text-destructive">
          {getQueryErrorMessage(error, errorMessage)}
        </Text>
      </View>
    );
  }

  return <View className={className}>{children}</View>;
}

export { QueryGuard };
export type { QueryGuardItem };
