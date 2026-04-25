import { apiToggleSaveMetier } from "@/api/apiMetier";
import { getErrorMessage } from "@/lib/get-error-message";
import { THEME } from "@/lib/theme";
import { type MetierListResponse } from "@/types/metier";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { HeartIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  type GestureResponderEvent,
  Pressable,
  useColorScheme,
} from "react-native";
import Toast from "react-native-toast-message";

type MetierSaveButtonProps = {
  codeOgr: string;
  initialSaved: boolean;
};

function updateSavedStateInPages(
  data: InfiniteData<MetierListResponse> | undefined,
  codeOgr: string,
  saved: boolean,
) {
  if (!data) {
    return data;
  }

  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      items: page.items.map((item) =>
        item.codeOgr === codeOgr ? { ...item, saved } : item,
      ),
    })),
  };
}

function removeSavedMetierFromPages(
  data: InfiniteData<MetierListResponse> | undefined,
  codeOgr: string,
) {
  if (!data) {
    return data;
  }

  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      items: page.items.filter((item) => item.codeOgr !== codeOgr),
    })),
  };
}

function MetierSaveButton({
  codeOgr,
  initialSaved,
}: MetierSaveButtonProps) {
  const colorScheme = useColorScheme();
  const theme = THEME[colorScheme === "dark" ? "dark" : "light"];
  const queryClient = useQueryClient();
  const [saved, setSaved] = useState(initialSaved);

  useEffect(() => {
    setSaved(initialSaved);
  }, [initialSaved]);

  const mutation = useMutation({
    mutationFn: () => apiToggleSaveMetier(codeOgr),
    onMutate: async () => {
      const previousSaved = saved;
      const nextSaved = !previousSaved;

      setSaved(nextSaved);

      queryClient.setQueriesData<InfiniteData<MetierListResponse>>(
        { queryKey: ["metiers"] },
        (data) => updateSavedStateInPages(data, codeOgr, nextSaved),
      );

      if (!nextSaved) {
        queryClient.setQueryData<InfiniteData<MetierListResponse>>(
          ["metiers", "saved"],
          (data) => removeSavedMetierFromPages(data, codeOgr),
        );
      }

      return { previousSaved };
    },
    onSuccess: ({ saved: nextSaved }) => {
      setSaved(nextSaved);

      queryClient.setQueriesData<InfiniteData<MetierListResponse>>(
        { queryKey: ["metiers"] },
        (data) => updateSavedStateInPages(data, codeOgr, nextSaved),
      );

      if (!nextSaved) {
        queryClient.setQueryData<InfiniteData<MetierListResponse>>(
          ["metiers", "saved"],
          (data) => removeSavedMetierFromPages(data, codeOgr),
        );
      }

      void queryClient.invalidateQueries({ queryKey: ["metiers"] });
    },
    onError: async (error, _variables, context) => {
      const previousSaved = context?.previousSaved ?? initialSaved;

      setSaved(previousSaved);
      queryClient.setQueriesData<InfiniteData<MetierListResponse>>(
        { queryKey: ["metiers"] },
        (data) => updateSavedStateInPages(data, codeOgr, previousSaved),
      );
      void queryClient.invalidateQueries({ queryKey: ["metiers", "saved"] });

      const message = await getErrorMessage(
        error,
        "Impossible de mettre a jour vos favoris.",
      );

      Toast.show({
        type: "error",
        text1: "Erreur favoris",
        text2: message,
      });
    },
  });

  const handlePress = (event: GestureResponderEvent) => {
    event.stopPropagation();

    if (mutation.isPending) {
      return;
    }

    void mutation.mutateAsync();
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={saved ? "Retirer des favoris" : "Ajouter aux favoris"}
      accessibilityState={{ busy: mutation.isPending, selected: saved }}
      className="rounded-full p-2"
      disabled={mutation.isPending}
      hitSlop={8}
      onPressIn={(event) => {
        event.stopPropagation();
      }}
      onPress={handlePress}
      onStartShouldSetResponder={() => true}
    >
      <HeartIcon
        size={27}
        color={theme.destructive}
        fill={saved ? theme.destructive : "transparent"}
      />
    </Pressable>
  );
}

export { MetierSaveButton };
