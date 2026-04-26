import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="metier/[codeOgr]"
        options={{
          title: "Metier",
        }}
      />
    </Stack>
  );
}
