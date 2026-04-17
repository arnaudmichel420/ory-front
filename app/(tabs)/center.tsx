import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

export default function CenterScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 bg-background" />
    </SafeAreaView>
  );
}
