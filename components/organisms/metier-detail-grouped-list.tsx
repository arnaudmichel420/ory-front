import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

type MetierDetailGroupedListItem = {
  id: string | number;
  libelle: string;
  highlighted?: boolean;
};

type MetierDetailGroupedListGroup = {
  key: string;
  title: string;
  icon: React.ComponentProps<typeof Icon>["as"];
  items: MetierDetailGroupedListItem[];
};

type MetierDetailGroupedListProps = {
  groups: MetierDetailGroupedListGroup[];
};

function MetierDetailGroupedList({ groups }: MetierDetailGroupedListProps) {
  return (
    <View className="gap-8">
      {groups.map((group) => (
        <View key={group.key} className="gap-4">
          <View className="flex-row items-center gap-2">
            <Icon as={group.icon} size={16} className="text-muted-foreground" />
            <Text className="text-base font-semibold text-foreground">
              {group.title}
            </Text>
          </View>

          <View className="gap-4 pl-4">
            {group.items.map((item) => (
              <View key={item.id} className="flex-row items-start gap-3">
                <Text className="pt-0.5 text-base text-muted-foreground">
                  •
                </Text>
                <Text
                  className={
                    item.highlighted
                      ? "flex-1 leading-7 font-semibold text-foreground"
                      : "flex-1 leading-7 text-foreground"
                  }
                >
                  {item.libelle}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

export {
  MetierDetailGroupedList,
  type MetierDetailGroupedListGroup,
  type MetierDetailGroupedListItem,
};
