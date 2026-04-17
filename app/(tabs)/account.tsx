import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useSessionStore } from "@/store/session";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountScreen() {
  const signOut = useSessionStore.use.signOut();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 py-6"
        showsVerticalScrollIndicator={false}
      >
        <Card>
          <CardHeader>
            <CardTitle>Mon compte</CardTitle>
            <CardDescription className="leading-6">
              Ecran protege de demonstration. Tant que la session mockee est
              active, cette page est accessible.
            </CardDescription>
          </CardHeader>
          <CardContent />
          <CardFooter>
            <Button
              onPress={() => {
                void signOut();
              }}
              className="w-full rounded-xl"
            >
              <Text>Se deconnecter</Text>
            </Button>
          </CardFooter>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
