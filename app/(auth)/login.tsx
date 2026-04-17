import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormField } from "@/components/molecules/form-field";
import { Text } from "@/components/ui/text";
import { useSessionStore } from "@/store/session";
import { Link } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const signIn = useSessionStore.use.signIn();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerClassName="min-h-full justify-center px-6 py-8"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Card className="rounded-[28px]">
          <CardHeader>
            <CardTitle>Connexion</CardTitle>
          </CardHeader>
          <CardContent className="gap-5">
            <FormField
              label="Email"
              placeholder="bonjour@ory.app"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
            />

            <FormField
              label="Mot de passe"
              placeholder="••••••••"
              secureTextEntry
              textContentType="password"
            />

            <Button
              onPress={() => {
                void signIn();
              }}
              size="lg"
              className="mt-2 rounded-xl"
            >
              <Text>Se connecter</Text>
            </Button>
          </CardContent>
          <CardFooter className="justify-center">
            <Link href="/register" asChild>
              <Button
                variant="link"
                className="h-auto justify-center px-0 py-0"
              >
                <Text>Creer un compte</Text>
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
