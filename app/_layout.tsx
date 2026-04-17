import "@/global.css";

import { toastConfig } from "@/config/toast";
import { RootNavigator } from "@/components/organisms/root-navigator";
import { NAV_THEME } from "@/lib/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import Toast from "react-native-toast-message";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const queryClient = new QueryClient();
export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider value={NAV_THEME[colorScheme ?? "light"]}>
          <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
          <RootNavigator />
          <PortalHost />
          <Toast config={toastConfig} topOffset={insets.top + 12} />
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
