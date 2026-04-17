import { FormField } from "@/components/molecules/form-field";
import * as React from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

type ControlledFormFieldProps<TFieldValues extends FieldValues> = Omit<
  React.ComponentProps<typeof FormField>,
  "value" | "onChangeText" | "onBlur" | "errorMessage"
> & {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
};

function ControlledFormField<TFieldValues extends FieldValues>({
  control,
  name,
  ...props
}: ControlledFormFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormField
          {...props}
          value={typeof field.value === "string" ? field.value : ""}
          onBlur={field.onBlur}
          onChangeText={field.onChange}
          errorMessage={fieldState.error?.message}
        />
      )}
    />
  );
}

export { ControlledFormField };
