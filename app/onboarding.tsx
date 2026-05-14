import {
  apiPatchEtudiantProfile,
  apiPutEtudiantProfile,
} from "@/api/apiEtudiant";
import {
  apiGetOnboardingQuestionnaire,
  apiPutOnboardingReponses,
} from "@/api/apiQuestionnaireReco";
import { QueryGuard } from "@/components/molecules/query-guard";
import { EtudiantProfileFields } from "@/components/organisms/etudiant-profile-fields";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useOnboardingQuestionnaire } from "@/hooks/use-onboarding-questionnaire";
import {
  EMPTY_PROFILE_FORM,
  ETUDIANT_PROFILE_QUERY_KEY,
  getChangedProfileValues,
  getProfileFormValues,
  hasProfileChanges,
} from "@/lib/etudiant-profile";
import { getErrorMessage } from "@/lib/get-error-message";
import {
  getQuestionSelectedChoices,
  getSelectedChoiceIds,
  QUESTIONNAIRE_ONBOARDING_QUERY_KEY,
} from "@/lib/onboarding-questionnaire";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useSessionStore } from "@/store/session";
import {
  type EtudiantProfile,
  type EtudiantProfileFormValues,
  type EtudiantProfilePatchPayload,
  etudiantProfileFormSchema,
} from "@/types/etudiant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from "lucide-react-native";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  Pressable,
  ScrollView,
  View,
  type DimensionValue,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

type SaveProfileVariables =
  | {
      mode: "create";
      values: EtudiantProfileFormValues;
    }
  | {
      mode: "update";
      values: EtudiantProfilePatchPayload;
    };

export default function OnboardingScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const profileData = useSessionStore.use.etudiant();
  const setEtudiant = useSessionStore.use.setEtudiant();
  const setOnbordingStatus = useSessionStore.use.setOnbordingStatus();

  const profileForm = useForm<EtudiantProfileFormValues>({
    resolver: zodResolver(etudiantProfileFormSchema),
    defaultValues: EMPTY_PROFILE_FORM,
  });

  const {
    data: questionnaire,
    isLoading: isQuestionnaireLoading,
    error: questionnaireError,
  } = useQuery({
    queryKey: QUESTIONNAIRE_ONBOARDING_QUERY_KEY,
    queryFn: apiGetOnboardingQuestionnaire,
  });
  const {
    currentStep,
    currentQuestion,
    goToFirstQuestion,
    goToNextStep,
    goToPreviousStep,
    progressPercent,
    questions,
    selectedChoices,
    toggleChoice,
    totalSteps,
  } = useOnboardingQuestionnaire(questionnaire);

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
    onSuccess: (profile: EtudiantProfile) => {
      queryClient.setQueryData(ETUDIANT_PROFILE_QUERY_KEY, profile);
      setEtudiant(profile);
      setOnbordingStatus(profile.onbording);
      profileForm.reset(getProfileFormValues(profile));
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

  const saveResponsesMutation = useMutation({
    mutationFn: (choixIds: number[]) => apiPutOnboardingReponses({ choixIds }),
    onSuccess: async () => {
      setOnbordingStatus(true);
      await queryClient.invalidateQueries({
        queryKey: ETUDIANT_PROFILE_QUERY_KEY,
      });

      Toast.show({
        type: "success",
        text1: "Questionnaire termine",
        text2: "Tes recommandations seront plus pertinentes.",
      });

      router.replace(ROUTES.home);
    },
    onError: async (error) => {
      const message = await getErrorMessage(
        error,
        "Une erreur est survenue lors de l'enregistrement des reponses.",
      );

      Toast.show({
        type: "error",
        text1: "Erreur questionnaire",
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
      goToFirstQuestion();
      return;
    }

    const patchValues = getChangedProfileValues(values, profile);

    if (hasProfileChanges(patchValues)) {
      await saveProfileMutation.mutateAsync({
        mode: "update",
        values: patchValues,
      });
    }

    goToFirstQuestion();
  });

  const onQuit = () => {
    Alert.alert(
      "Quitter le questionnaire ?",
      "Quitter maintenant nuira a ton experience et rendra les recommandations moins pertinentes.",
      [
        {
          text: "Continuer",
          style: "cancel",
        },
        {
          text: "Quitter",
          style: "destructive",
          onPress: () => router.replace(ROUTES.home),
        },
      ],
    );
  };

  const goToNextQuestion = () => {
    if (!currentQuestion) {
      return;
    }

    const selectedForQuestion = getQuestionSelectedChoices(
      selectedChoices,
      currentQuestion,
    );

    if (selectedForQuestion.length === 0) {
      Toast.show({
        type: "info",
        text1: "Selection requise",
        text2: "Choisis au moins une reponse pour continuer.",
      });
      return;
    }

    if (currentStep < totalSteps - 1) {
      goToNextStep();
      return;
    }

    const choixIds = getSelectedChoiceIds(questions, selectedChoices);

    saveResponsesMutation.mutate(choixIds);
  };

  const isProfileSaving = saveProfileMutation.isPending;
  const isSavingResponses = saveResponsesMutation.isPending;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="border-b border-border px-6 pb-4 pt-3">
        <View className="mb-4 flex-row items-center justify-between gap-4">
          <View className="flex-1 gap-1">
            <Text variant="h3">Profil de recommandation</Text>
            <Text className="text-sm text-muted-foreground">
              Etape {Math.min(currentStep + 1, totalSteps)} sur {totalSteps}
            </Text>
          </View>

          <Pressable
            onPress={onQuit}
            className="h-10 w-10 items-center justify-center rounded-full border border-border bg-background active:bg-accent"
            accessibilityRole="button"
            accessibilityLabel="Quitter le questionnaire"
          >
            <Icon as={XIcon} size={20} />
          </Pressable>
        </View>

        <View className="h-2 overflow-hidden rounded-full bg-muted">
          <View
            className="h-full rounded-full bg-primary"
            style={{ width: progressPercent as DimensionValue }}
          />
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 py-6"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <QueryGuard
          queries={[
            {
              isLoading: isQuestionnaireLoading,
              error: questionnaireError,
            },
          ]}
          loadingMessage="Preparation du questionnaire..."
          errorMessage="Impossible de charger le questionnaire pour le moment."
          className="gap-6"
        >
          {currentStep === 0 ? (
            <View className="gap-6">
              <View className="gap-2">
                <Text variant="h4">Complete ton profil</Text>
                <Text className="text-sm leading-5 text-muted-foreground">
                  Ces informations permettent de personnaliser ton espace.
                </Text>
              </View>

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
                  {isProfileSaving ? "Enregistrement..." : "Continuer"}
                </Text>
                {!isProfileSaving ? <Icon as={ChevronRightIcon} /> : null}
              </Button>
            </View>
          ) : null}

          {currentQuestion ? (
            <View className="gap-6">
              <View className="gap-2">
                <Text variant="h4">{currentQuestion.libelle}</Text>
                <Text className="text-sm leading-5 text-muted-foreground">
                  {currentQuestion.type === "single"
                    ? "Choisis une seule reponse."
                    : "Choisis une ou plusieurs reponses."}
                </Text>
              </View>

              <View className="gap-3">
                {currentQuestion.choix.map((choice) => {
                  const isSelected = getQuestionSelectedChoices(
                    selectedChoices,
                    currentQuestion,
                  ).includes(choice.id);

                  return (
                    <Pressable
                      key={choice.id}
                      onPress={() => toggleChoice(currentQuestion, choice.id)}
                      className={cn(
                        "min-h-12 flex-row items-center justify-between gap-3 rounded-lg border px-4 py-3 active:bg-accent",
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border bg-background",
                      )}
                      accessibilityRole="button"
                      accessibilityState={{ selected: isSelected }}
                    >
                      <Text className="flex-1 leading-5">{choice.libelle}</Text>
                      {isSelected ? (
                        <View className="h-6 w-6 items-center justify-center rounded-full bg-primary">
                          <Icon
                            as={CheckIcon}
                            size={16}
                            className="text-primary-foreground"
                          />
                        </View>
                      ) : null}
                    </Pressable>
                  );
                })}
              </View>

              <View className="flex-row gap-3">
                <Button
                  variant="outline"
                  onPress={goToPreviousStep}
                  disabled={isSavingResponses}
                  className="flex-1 rounded-xl"
                >
                  <Icon as={ChevronLeftIcon} />
                  <Text>Retour</Text>
                </Button>

                <Button
                  onPress={goToNextQuestion}
                  disabled={isSavingResponses}
                  className="flex-1 rounded-xl"
                >
                  <Text>
                    {isSavingResponses
                      ? "Enregistrement..."
                      : currentStep === totalSteps - 1
                        ? "Terminer"
                        : "Suivant"}
                  </Text>
                  {!isSavingResponses ? (
                    <Icon
                      as={
                        currentStep === totalSteps - 1
                          ? CheckIcon
                          : ChevronRightIcon
                      }
                    />
                  ) : null}
                </Button>
              </View>
            </View>
          ) : null}
        </QueryGuard>
      </ScrollView>
    </SafeAreaView>
  );
}
