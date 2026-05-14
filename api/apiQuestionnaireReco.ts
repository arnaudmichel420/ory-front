import api from "@/api/api";
import {
  type QuestionnaireRecoOnboarding,
  type QuestionnaireRecoReponsesPayload,
  questionnaireRecoOnboardingSchema,
  questionnaireRecoReponsesPayloadSchema,
} from "@/types/questionnaire-reco";

export const apiGetOnboardingQuestionnaire =
  async (): Promise<QuestionnaireRecoOnboarding> => {
    const response = await api.get("api/questionnaires-reco/onboarding").json();

    return questionnaireRecoOnboardingSchema.parse(response);
  };

export const apiPutOnboardingReponses = async (
  payload: QuestionnaireRecoReponsesPayload,
): Promise<void> => {
  await api.put("api/questionnaires-reco/onboarding/reponses", {
    json: questionnaireRecoReponsesPayloadSchema.parse(payload),
  });
};
