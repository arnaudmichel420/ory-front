import { useSessionStore } from "@/store/session";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

function RootNavigator() {
  const hasBootstrapped = useSessionStore.use.hasBootstrapped();
  const isAuthenticated = useSessionStore.use.isAuthenticated();

  useEffect(() => {
    void useSessionStore.getState().bootstrapSession();
  }, []);

  if (!hasBootstrapped) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-6">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(protected)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export { RootNavigator };
