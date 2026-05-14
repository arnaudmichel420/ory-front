import { ROUTES } from "@/lib/routes";
import { useSessionStore } from "@/store/session";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const hasBootstrapped = useSessionStore.use.hasBootstrapped();
  const isAuthenticated = useSessionStore.use.isAuthenticated();
  const onbording = useSessionStore.use.onbording();

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

  if (onbording === false) {
    return <Redirect href={ROUTES.onboarding} />;
  }

  return <Redirect href={ROUTES.home} />;
}
