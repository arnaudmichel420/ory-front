import { THEME } from "@/lib/theme";
import { useColorScheme } from "nativewind";
import {
  BaseToast,
  ErrorToast,
  InfoToast,
  type ToastConfig,
} from "react-native-toast-message";

function SuccessToast(
  props: React.ComponentProps<typeof BaseToast>,
) {
  const { colorScheme } = useColorScheme();
  const theme = THEME[colorScheme ?? "light"];

  return (
    <BaseToast
      {...props}
      style={{
        backgroundColor: theme.card,
        borderLeftColor: theme.success,
        borderLeftWidth: 4,
        borderColor: theme.border,
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
      }}
      text1Style={{
        color: theme.foreground,
        fontSize: 15,
        fontWeight: "600",
      }}
      text2Style={{
        color: theme.mutedForeground,
        fontSize: 14,
      }}
    />
  );
}

function DestructiveToast(
  props: React.ComponentProps<typeof ErrorToast>,
) {
  const { colorScheme } = useColorScheme();
  const theme = THEME[colorScheme ?? "light"];

  return (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: theme.card,
        borderLeftColor: theme.destructive,
        borderLeftWidth: 4,
        borderColor: theme.border,
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
      }}
      text1Style={{
        color: theme.foreground,
        fontSize: 15,
        fontWeight: "600",
      }}
      text2Style={{
        color: theme.mutedForeground,
        fontSize: 14,
      }}
    />
  );
}

function DefaultInfoToast(
  props: React.ComponentProps<typeof InfoToast>,
) {
  const { colorScheme } = useColorScheme();
  const theme = THEME[colorScheme ?? "light"];

  return (
    <InfoToast
      {...props}
      style={{
        backgroundColor: theme.card,
        borderLeftColor: theme.primary,
        borderLeftWidth: 4,
        borderColor: theme.border,
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
      }}
      text1Style={{
        color: theme.foreground,
        fontSize: 15,
        fontWeight: "600",
      }}
      text2Style={{
        color: theme.mutedForeground,
        fontSize: 14,
      }}
    />
  );
}

const toastConfig: ToastConfig = {
  success: (props) => <SuccessToast {...props} />,
  error: (props) => <DestructiveToast {...props} />,
  info: (props) => <DefaultInfoToast {...props} />,
};

export { toastConfig };
