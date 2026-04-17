import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack>
      <Stack.Screen name="account-home" options={{ headerShown: false }} />
    </Stack>
  );
}
