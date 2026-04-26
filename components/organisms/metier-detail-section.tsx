import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { type PropsWithChildren } from "react";
import { View } from "react-native";

type MetierDetailSectionProps = PropsWithChildren<{
  title: string;
  icon: React.ComponentProps<typeof Icon>["as"];
}>;

function MetierDetailSection({
  title,
  icon,
  children,
}: MetierDetailSectionProps) {
  return (
    <View className="gap-4 border-b border-border/70 pb-7">
      <View className="flex-row items-center gap-3">
        <View className="rounded-full bg-secondary px-3 py-3">
          <Icon as={icon} size={18} />
        </View>
        <Text variant="h4" className="text-left">
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
}

export { MetierDetailSection };
