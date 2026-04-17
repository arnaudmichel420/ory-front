import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ControlledFormField } from "@/components/molecules/controlled-form-field";
import { getErrorMessage } from "@/lib/get-error-message";
import { Text } from "@/components/ui/text";
import { ROUTES } from "@/lib/routes";
import { Link } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  registerFormSchema,
  type RegisterFormValues,
  type RegisterPayload,
} from "@/types/auth";
import { apiRegister } from "@/api/apiAuth";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export default function RegisterScreen() {
  const router = useRouter();

  const { control, handleSubmit } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync: register } = useMutation({
    mutationFn: (formValues: RegisterPayload) => {
      return apiRegister(formValues);
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Compte cree",
        text2: "Vous pouvez maintenant vous connecter.",
      });
      router.replace(ROUTES.login);
    },
    onError: async (error) => {
      const message = await getErrorMessage(
        error,
        "Une erreur est survenue lors de l'inscription.",
      );

      Toast.show({
        type: "error",
        text1: "Erreur d'inscription",
        text2: message,
      });
    },
  });

  const onSubmit = handleSubmit((formValues) => {
    const payload: RegisterPayload = {
      email: formValues.email,
      password: formValues.password,
    };

    return register(payload);
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
            <CardTitle>Creation de compte</CardTitle>
          </CardHeader>
          <CardContent className="gap-4">
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
              textContentType="newPassword"
            />
            <ControlledFormField
              control={control}
              name="confirmPassword"
              label="Confirmer le mot de passe"
              placeholder="Confirmer votre mot de passe"
              secureTextEntry
              textContentType="newPassword"
            />

            <Button onPress={onSubmit} size="lg" className="mt-2 rounded-xl">
              <Text>Creer mon compte</Text>
            </Button>
          </CardContent>
          <CardFooter className="justify-center">
            <Link href={ROUTES.login} asChild>
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
