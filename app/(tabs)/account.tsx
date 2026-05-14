import {
  apiChangePassword,
  apiPatchEtudiantProfile,
  apiPutEtudiantProfile,
} from "@/api/apiEtudiant";
import { ControlledFormField } from "@/components/molecules/controlled-form-field";
import { EtudiantProfileFields } from "@/components/organisms/etudiant-profile-fields";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { getErrorMessage } from "@/lib/get-error-message";
import {
  EMPTY_PROFILE_FORM,
  ETUDIANT_PROFILE_QUERY_KEY,
  getChangedProfileValues,
  getProfileFormValues,
  hasProfileChanges,
} from "@/lib/etudiant-profile";
import { ROUTES } from "@/lib/routes";
import { useSessionStore } from "@/store/session";
import {
  type ChangePasswordPayload,
  type EtudiantProfile,
  type EtudiantProfileFormValues,
  type EtudiantProfilePatchPayload,
  changePasswordSchema,
  etudiantProfileFormSchema,
} from "@/types/etudiant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CompassIcon, LogOutIcon } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const EMPTY_PASSWORD_FORM: ChangePasswordPayload = {
  currentPassword: "",
  newPassword: "",
};

type SaveProfileVariables =
  | {
      mode: "create";
      values: EtudiantProfileFormValues;
    }
  | {
      mode: "update";
      values: EtudiantProfilePatchPayload;
    };

export default function AccountScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const signOut = useSessionStore.use.signOut();
  const profileData = useSessionStore.use.etudiant();
  const setEtudiant = useSessionStore.use.setEtudiant();

  const profileForm = useForm<EtudiantProfileFormValues>({
    resolver: zodResolver(etudiantProfileFormSchema),
    defaultValues: EMPTY_PROFILE_FORM,
  });

  const passwordForm = useForm<ChangePasswordPayload>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: EMPTY_PASSWORD_FORM,
  });

  const profile = profileData;

  useEffect(() => {
    profileForm.reset(getProfileFormValues(profileData));
  }, [profileForm, profileData]);

  const saveProfileMutation = useMutation({
    mutationFn: (variables: SaveProfileVariables) => {
      if (variables.mode === "create") {
        return apiPutEtudiantProfile(variables.values);
      }

      return apiPatchEtudiantProfile(variables.values);
    },
    onSuccess: (profile: EtudiantProfile, variables) => {
      queryClient.setQueryData(ETUDIANT_PROFILE_QUERY_KEY, profile);
      setEtudiant(profile);
      profileForm.reset(getProfileFormValues(profile));

      Toast.show({
        type: "success",
        text1:
          variables.mode === "create" ? "Profil cree" : "Profil mis a jour",
      });
    },
    onError: async (error) => {
      const message = await getErrorMessage(
        error,
        "Une erreur est survenue lors de l'enregistrement du profil.",
      );

      Toast.show({
        type: "error",
        text1: "Erreur profil",
        text2: message,
      });
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (values: ChangePasswordPayload) => apiChangePassword(values),
    onSuccess: () => {
      passwordForm.reset(EMPTY_PASSWORD_FORM);

      Toast.show({
        type: "success",
        text1: "Mot de passe modifie",
      });
    },
    onError: async (error) => {
      const message = await getErrorMessage(
        error,
        "Une erreur est survenue lors du changement de mot de passe.",
      );

      Toast.show({
        type: "error",
        text1: "Erreur mot de passe",
        text2: message,
      });
    },
  });

  const onSubmitProfile = profileForm.handleSubmit(async (values) => {
    if (profile === null) {
      await saveProfileMutation.mutateAsync({
        mode: "create",
        values,
      });
      return;
    }

    const patchValues = getChangedProfileValues(values, profile);

    if (!hasProfileChanges(patchValues)) {
      Toast.show({
        type: "info",
        text1: "Aucun changement",
        text2: "Votre profil est deja a jour.",
      });
      return;
    }

    await saveProfileMutation.mutateAsync({
      mode: "update",
      values: patchValues,
    });
  });

  const onSubmitPassword = passwordForm.handleSubmit((values) => {
    return changePasswordMutation.mutateAsync(values);
  });

  const isProfileSaving = saveProfileMutation.isPending;
  const isPasswordSaving = changePasswordMutation.isPending;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 py-6"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-6 flex-row items-center justify-between gap-4">
          <View className="flex-1 gap-1">
            <Text variant="h3">Mon compte</Text>
          </View>
          <Pressable
            onPress={() => {
              void signOut();
            }}
            className="h-10 w-10 items-center justify-center rounded-full border border-border bg-background active:bg-accent"
            accessibilityRole="button"
            accessibilityLabel="Se deconnecter"
          >
            <Icon as={LogOutIcon} size={20} className="text-destructive" />
          </Pressable>
        </View>

        <View className="gap-5">
          <Button
            variant="outline"
            onPress={() => {
              router.push(ROUTES.onboarding);
            }}
            className="w-full rounded-xl"
          >
            <Icon as={CompassIcon} size={18} />
            <Text>Refaire le questionnaire</Text>
          </Button>

          <View className="gap-5">
            <EtudiantProfileFields
              control={profileForm.control}
              editable={!isProfileSaving}
            />

            <Button
              onPress={onSubmitProfile}
              disabled={isProfileSaving}
              className="w-full rounded-xl"
            >
              <Text>
                {isProfileSaving ? "Enregistrement..." : "Enregistrer"}
              </Text>
            </Button>
          </View>
        </View>

        <View className="my-8 h-px bg-border" />

        <View className="gap-5">
          <View className="gap-1">
            <Text variant="h4">Mot de passe</Text>
            <Text className="text-sm leading-5 text-muted-foreground">
              Choisissez un nouveau mot de passe securise.
            </Text>
          </View>

          <View className="gap-4">
            <ControlledFormField
              control={passwordForm.control}
              name="currentPassword"
              label="Mot de passe actuel"
              placeholder="Ancien mot de passe"
              secureTextEntry
              textContentType="password"
              editable={!isPasswordSaving}
            />
            <ControlledFormField
              control={passwordForm.control}
              name="newPassword"
              label="Nouveau mot de passe"
              placeholder="Nouveau mot de passe"
              secureTextEntry
              textContentType="newPassword"
              editable={!isPasswordSaving}
            />
          </View>

          <Button
            onPress={onSubmitPassword}
            disabled={isPasswordSaving}
            className="w-full rounded-xl"
          >
            <Text>
              {isPasswordSaving
                ? "Modification..."
                : "Modifier le mot de passe"}
            </Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
