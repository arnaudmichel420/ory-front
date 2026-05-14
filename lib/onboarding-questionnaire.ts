import type {
  QuestionnaireRecoOnboarding,
  QuestionnaireRecoQuestion,
} from "@/types/questionnaire-reco";

export const QUESTIONNAIRE_ONBOARDING_QUERY_KEY = [
  "questionnaires-reco",
  "onboarding",
] as const;

export type SelectedChoicesByQuestion = Record<number, number[]>;

export function getSortedOnboardingQuestions(
  questionnaire: QuestionnaireRecoOnboarding | undefined,
) {
  return questionnaire
    ? [...questionnaire.questions].sort((a, b) => a.ordre - b.ordre)
    : [];
}

export function getOnboardingProgressPercent(
  currentStep: number,
  totalSteps: number,
) {
  return `${Math.round(((currentStep + 1) / totalSteps) * 100)}%`;
}

export function getOnboardingCurrentQuestion(
  currentStep: number,
  questions: QuestionnaireRecoQuestion[],
) {
  return currentStep > 0 ? questions[currentStep - 1] : null;
}

export function getQuestionSelectedChoices(
  selectedChoices: SelectedChoicesByQuestion,
  question: QuestionnaireRecoQuestion,
) {
  return selectedChoices[question.id] ?? [];
}

export function toggleSelectedQuestionChoice(
  selectedChoices: SelectedChoicesByQuestion,
  question: QuestionnaireRecoQuestion,
  choiceId: number,
) {
  const selectedForQuestion = selectedChoices[question.id] ?? [];

  if (question.type === "single") {
    return {
      ...selectedChoices,
      [question.id]: selectedForQuestion.includes(choiceId) ? [] : [choiceId],
    };
  }

  return {
    ...selectedChoices,
    [question.id]: selectedForQuestion.includes(choiceId)
      ? selectedForQuestion.filter((id) => id !== choiceId)
      : [...selectedForQuestion, choiceId],
  };
}

export function getSelectedChoiceIds(
  questions: QuestionnaireRecoQuestion[],
  selectedChoices: SelectedChoicesByQuestion,
) {
  return questions.flatMap((question) => selectedChoices[question.id] ?? []);
}
