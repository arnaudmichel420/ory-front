import { ROUTES } from "@/lib/routes";
import { useSessionStore } from "@/store/session";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const hasBootstrapped = useSessionStore.use.hasBootstrapped();
  const isAuthenticated = useSessionStore.use.isAuthenticated();

  if (!hasBootstrapped) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-6">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href={ROUTES.login} />;
  }

  return <Redirect href={ROUTES.home} />;
}
