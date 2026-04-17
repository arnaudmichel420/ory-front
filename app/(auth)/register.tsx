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

export default function RegisterScreen() {
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
            <CardTitle>Creation de compte</CardTitle>
          </CardHeader>
          <CardContent className="gap-4">
            <FormField
              label="Nom complet"
              placeholder="Arnaud Martin"
              textContentType="name"
            />

            <FormField
              label="Email"
              placeholder="arnaud@ory.app"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
            />

            <FormField
              label="Mot de passe"
              placeholder="Choisir un mot de passe"
              secureTextEntry
              textContentType="newPassword"
            />

            <Button
              onPress={() => {
                void signIn();
              }}
              size="lg"
              className="mt-2 rounded-xl"
            >
              <Text>Creer mon compte</Text>
            </Button>
          </CardContent>
          <CardFooter className="justify-center">
            <Link href="/login" asChild>
              <Button
                variant="link"
                className="h-auto justify-center px-0 py-0"
              >
                <Text>J&apos;ai deja un compte</Text>
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
