import { apiLogin } from "@/api/apiAuth";
import { ControlledFormField } from "@/components/molecules/controlled-form-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { getErrorMessage } from "@/lib/get-error-message";
import { ROUTES } from "@/lib/routes";
import { useSessionStore } from "@/store/session";
import { LoginPayload, loginPayloadSchema, LoginResponse } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const router = useRouter();
  const signIn = useSessionStore.use.signIn();

  const { control, handleSubmit } = useForm<LoginPayload>({
    resolver: zodResolver(loginPayloadSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: login } = useMutation({
    mutationFn: (formValues: LoginPayload) => {
      return apiLogin(formValues);
    },
    onSuccess: (response: LoginResponse) => {
      Toast.show({
        type: "success",
        text1: "Connexion avec succès",
      });
      signIn(response.token);
      router.replace(ROUTES.home);
    },
    onError: async (error) => {
      const message = await getErrorMessage(
        error,
        "Une erreur est survenue lors de la connexion",
      );

      Toast.show({
        type: "error",
        text1: "Erreur de connexion",
        text2: message,
      });
    },
  });

  const onSubmit = handleSubmit(async (formValues) => {
    try {
      await login(formValues);
    } catch {
      // The mutation's onError already shows the user-facing toast.
    }
  });

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
            <ControlledFormField
              control={control}
              name="email"
              label="Email"
              placeholder="arnaud@ory.app"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
            />

            <ControlledFormField
              control={control}
              name="password"
              label="Mot de passe"
              placeholder="Choisir un mot de passe"
              secureTextEntry
              textContentType="password"
            />

            <Button onPress={onSubmit} size="lg" className="mt-2 rounded-xl">
              <Text>Se connecter</Text>
            </Button>
          </CardContent>
          <CardFooter className="justify-center">
            <Link href={ROUTES.register} asChild>
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
