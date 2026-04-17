import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import * as React from "react";
import { View } from "react-native";

type FormFieldProps = React.ComponentProps<typeof Input> & {
  label: string;
  description?: string;
  errorMessage?: string;
  containerClassName?: string;
  inputClassName?: string;
};

function FormField({
  label,
  description,
  errorMessage,
  containerClassName,
  inputClassName,
  ...props
}: FormFieldProps) {
  return (
    <View className={cn("gap-2", containerClassName)}>
      <Label>{label}</Label>
      <Input className={inputClassName} {...props} />
      {errorMessage ? (
        <Text className="text-sm text-destructive">{errorMessage}</Text>
      ) : description ? (
        <Text className="text-sm text-muted-foreground">{description}</Text>
      ) : null}
    </View>
  );
}

export { FormField };
