import api from "@/api/api";
import {
  type ChangePasswordPayload,
  type EtudiantProfile,
  type EtudiantProfileFormValues,
  type EtudiantProfilePatchPayload,
  etudiantProfilePatchSchema,
  etudiantProfileSchema,
} from "@/types/etudiant";
import { HTTPError } from "ky";

export const apiGetEtudiantProfile =
  async (): Promise<EtudiantProfile | null> => {
    try {
      const response = await api.get("api/me/etudiant").json();

      return etudiantProfileSchema.parse(response);
    } catch (error) {
      if (error instanceof HTTPError && error.response.status === 404) {
        return null;
      }

      throw error;
    }
  };

export const apiPutEtudiantProfile = async (
  payload: EtudiantProfileFormValues,
): Promise<EtudiantProfile> => {
  const response = await api.put("api/me/etudiant", { json: payload }).json();

  return etudiantProfileSchema.parse(response);
};

export const apiPatchEtudiantProfile = async (
  payload: EtudiantProfilePatchPayload,
): Promise<EtudiantProfile> => {
  const response = await api
    .patch("api/me/etudiant", {
      json: etudiantProfilePatchSchema.parse(payload),
    })
    .json();

  return etudiantProfileSchema.parse(response);
};

export const apiChangePassword = async (
  payload: ChangePasswordPayload,
): Promise<void> => {
  await api.patch("api/me/password", { json: payload });
};
