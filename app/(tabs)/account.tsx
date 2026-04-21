import {
  apiChangePassword,
  apiGetEtudiantProfile,
  apiPatchEtudiantProfile,
  apiPutEtudiantProfile,
} from "@/api/apiEtudiant";
import { ControlledFormField } from "@/components/molecules/controlled-form-field";
import { QueryGuard } from "@/components/molecules/query-guard";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { getErrorMessage } from "@/lib/get-error-message";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOutIcon } from "lucide-react-native";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const ETUDIANT_PROFILE_QUERY_KEY = ["me", "etudiant"] as const;

const EMPTY_PROFILE_FORM: EtudiantProfileFormValues = {
  nom: "",
  prenom: "",
  adresse: "",
  ville: "",
  codePostal: "",
  telephone: "",
};

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

function getProfileFormValues(
  profile: EtudiantProfile | null | undefined,
): EtudiantProfileFormValues {
  if (!profile) {
    return EMPTY_PROFILE_FORM;
  }

  return {
    nom: profile.nom,
    prenom: profile.prenom,
    adresse: profile.adresse,
    ville: profile.ville,
    codePostal: profile.codePostal,
    telephone: profile.telephone,
  };
}

function getChangedProfileValues(
  values: EtudiantProfileFormValues,
  profile: EtudiantProfile,
): EtudiantProfilePatchPayload {
  return (
    Object.keys(values) as Array<keyof EtudiantProfileFormValues>
  ).reduce<EtudiantProfilePatchPayload>((payload, field) => {
    if (values[field] !== profile[field]) {
      payload[field] = values[field];
    }

    return payload;
  }, {});
}

function hasProfileChanges(values: EtudiantProfilePatchPayload) {
  return Object.keys(values).length > 0;
}

export default function AccountScreen() {
  const queryClient = useQueryClient();
  const signOut = useSessionStore.use.signOut();

  const profileForm = useForm<EtudiantProfileFormValues>({
    resolver: zodResolver(etudiantProfileFormSchema),
    defaultValues: EMPTY_PROFILE_FORM,
  });

  const passwordForm = useForm<ChangePasswordPayload>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: EMPTY_PASSWORD_FORM,
  });

  const {
    data: profileData,
    isLoading: isProfileLoading,
    error: profileError,
  } = useQuery({
    queryKey: ETUDIANT_PROFILE_QUERY_KEY,
    queryFn: apiGetEtudiantProfile,
  });

  const profile = profileData ?? null;

  useEffect(() => {
    if (profileData === undefined) {
      return;
    }

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
      profileForm.reset(getProfileFormValues(profile));

      Toast.show({
        type: "success",
        text1:
          variables.mode === "create"
            ? "Profil cree"
            : "Profil mis a jour",
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
          <QueryGuard
            queries={[
              {
                isLoading: isProfileLoading,
                error: profileError,
              },
            ]}
            loadingMessage="Chargement du profil..."
            errorMessage="Impossible de charger votre profil pour le moment."
            className="gap-5"
          >
            <View className="gap-4">
              <ControlledFormField
                control={profileForm.control}
                name="nom"
                label="Nom"
                placeholder="Dupont"
                autoCapitalize="words"
                editable={!isProfileSaving}
              />
              <ControlledFormField
                control={profileForm.control}
                name="prenom"
                label="Prenom"
                placeholder="Alice"
                autoCapitalize="words"
                editable={!isProfileSaving}
              />
              <ControlledFormField
                control={profileForm.control}
                name="adresse"
                label="Adresse"
                placeholder="12 rue Victor Hugo"
                textContentType="streetAddressLine1"
                editable={!isProfileSaving}
              />
              <ControlledFormField
                control={profileForm.control}
                name="ville"
                label="Ville"
                placeholder="Paris"
                autoCapitalize="words"
                textContentType="addressCity"
                editable={!isProfileSaving}
              />
              <ControlledFormField
                control={profileForm.control}
                name="codePostal"
                label="Code postal"
                placeholder="75001"
                keyboardType="number-pad"
                textContentType="postalCode"
                editable={!isProfileSaving}
              />
              <ControlledFormField
                control={profileForm.control}
                name="telephone"
                label="Telephone"
                placeholder="0601020304"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                editable={!isProfileSaving}
              />
            </View>

            <Button
              onPress={onSubmitProfile}
              disabled={isProfileSaving}
              className="w-full rounded-xl"
            >
              <Text>
                {isProfileSaving ? "Enregistrement..." : "Enregistrer"}
              </Text>
            </Button>
          </QueryGuard>
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
