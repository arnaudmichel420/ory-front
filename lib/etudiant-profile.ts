import {
  type EtudiantProfile,
  type EtudiantProfileFormValues,
  type EtudiantProfilePatchPayload,
} from "@/types/etudiant";

export const ETUDIANT_PROFILE_QUERY_KEY = ["me", "etudiant"] as const;

export const EMPTY_PROFILE_FORM: EtudiantProfileFormValues = {
  nom: "",
  prenom: "",
  adresse: "",
  ville: "",
  codePostal: "",
  telephone: "",
};

export function getProfileFormValues(
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

export function getChangedProfileValues(
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

export function hasProfileChanges(values: EtudiantProfilePatchPayload) {
  return Object.keys(values).length > 0;
}
