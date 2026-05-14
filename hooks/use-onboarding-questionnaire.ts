import {
  getOnboardingCurrentQuestion,
  getOnboardingProgressPercent,
  getSortedOnboardingQuestions,
  toggleSelectedQuestionChoice,
  type SelectedChoicesByQuestion,
} from "@/lib/onboarding-questionnaire";
import type {
  QuestionnaireRecoOnboarding,
  QuestionnaireRecoQuestion,
} from "@/types/questionnaire-reco";
import { useMemo, useState } from "react";

function useOnboardingQuestionnaire(
  questionnaire: QuestionnaireRecoOnboarding | undefined,
) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoices, setSelectedChoices] =
    useState<SelectedChoicesByQuestion>({});

  const questions = useMemo(
    () => getSortedOnboardingQuestions(questionnaire),
    [questionnaire],
  );
  const totalSteps = Math.max(questions.length + 1, 1);
  const currentQuestion = getOnboardingCurrentQuestion(currentStep, questions);
  const progressPercent = getOnboardingProgressPercent(
    Math.min(currentStep, totalSteps - 1),
    totalSteps,
  );

  const toggleChoice = (
    question: QuestionnaireRecoQuestion,
    choiceId: number,
  ) => {
    setSelectedChoices((current) =>
      toggleSelectedQuestionChoice(current, question, choiceId),
    );
  };

  const goToFirstQuestion = () => {
    setCurrentStep(1);
  };

  const goToNextStep = () => {
    setCurrentStep((step) => Math.min(step + 1, totalSteps - 1));
  };

  const goToPreviousStep = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  return {
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
  };
}

export { useOnboardingQuestionnaire };
