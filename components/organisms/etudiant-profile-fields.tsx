import { ControlledFormField } from "@/components/molecules/controlled-form-field";
import type { EtudiantProfileFormValues } from "@/types/etudiant";
import type { Control } from "react-hook-form";
import { View } from "react-native";

type EtudiantProfileFieldsProps = {
  control: Control<EtudiantProfileFormValues>;
  editable?: boolean;
};

function EtudiantProfileFields({
  control,
  editable = true,
}: EtudiantProfileFieldsProps) {
  return (
    <View className="gap-4">
      <ControlledFormField
        control={control}
        name="nom"
        label="Nom"
        placeholder="Dupont"
        autoCapitalize="words"
        editable={editable}
      />
      <ControlledFormField
        control={control}
        name="prenom"
        label="Prenom"
        placeholder="Alice"
        autoCapitalize="words"
        editable={editable}
      />
      <ControlledFormField
        control={control}
        name="adresse"
        label="Adresse"
        placeholder="12 rue Victor Hugo"
        textContentType="streetAddressLine1"
        editable={editable}
      />
      <ControlledFormField
        control={control}
        name="ville"
        label="Ville"
        placeholder="Paris"
        autoCapitalize="words"
        textContentType="addressCity"
        editable={editable}
      />
      <ControlledFormField
        control={control}
        name="codePostal"
        label="Code postal"
        placeholder="75001"
        keyboardType="number-pad"
        textContentType="postalCode"
        editable={editable}
      />
      <ControlledFormField
        control={control}
        name="telephone"
        label="Telephone"
        placeholder="0601020304"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        editable={editable}
      />
    </View>
  );
}

export { EtudiantProfileFields };
