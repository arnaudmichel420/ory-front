import { Link, Stack } from "expo-router";
import { ROUTES } from "@/lib/routes";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View>
        <Text>This screen doesn't exist.</Text>

        <Link href={ROUTES.root}>
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
