import { Text } from "@/components/ui/text";
import { View } from "react-native";

type MetierDetailBulletListProps = {
  items: string[];
};

function MetierDetailBulletList({ items }: MetierDetailBulletListProps) {
  return (
    <View className="gap-3">
      {items.map((item) => (
        <View key={item} className="flex-row items-start gap-3">
          <Text className="pt-0.5 text-base text-muted-foreground">•</Text>
          <Text className="flex-1 leading-7 text-foreground">{item}</Text>
        </View>
      ))}
    </View>
  );
}

export { MetierDetailBulletList };
