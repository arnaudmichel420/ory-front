import { z } from "zod";

export const questionnaireRecoChoixSchema = z.object({
  id: z.number(),
  libelle: z.string(),
});

export const questionnaireRecoQuestionSchema = z.object({
  id: z.number(),
  libelle: z.string(),
  type: z.enum(["single", "multi"]),
  ordre: z.number(),
  choix: z.array(questionnaireRecoChoixSchema),
});

export const questionnaireRecoOnboardingSchema = z.object({
  id: z.number(),
  libelle: z.string(),
  questions: z.array(questionnaireRecoQuestionSchema),
});

export const questionnaireRecoReponsesPayloadSchema = z.object({
  choixIds: z.array(z.number()),
});

export type QuestionnaireRecoChoix = z.infer<
  typeof questionnaireRecoChoixSchema
>;
export type QuestionnaireRecoQuestion = z.infer<
  typeof questionnaireRecoQuestionSchema
>;
export type QuestionnaireRecoOnboarding = z.infer<
  typeof questionnaireRecoOnboardingSchema
>;
export type QuestionnaireRecoReponsesPayload = z.infer<
  typeof questionnaireRecoReponsesPayloadSchema
>;
