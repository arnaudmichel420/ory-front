import { Icon } from "@/components/ui/icon";
import { NAV_THEME } from "@/lib/theme";
import { Tabs } from "expo-router";
import {
  HeartIcon,
  HouseIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react-native";
import { useColorScheme } from "nativewind";

const TAB_ICONS = {
  home: HouseIcon,
  metier: SearchIcon,
  favoris: HeartIcon,
  account: UserIcon,
};

export default function TabsLayout() {
  const { colorScheme } = useColorScheme();
  const theme = NAV_THEME[colorScheme ?? "light"];

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: colorScheme === "dark" ? "#8b8b8b" : "#7a7a7a",
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          height: 88,
          paddingBottom: 14,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarIcon: ({ color, size }) => (
          <Icon
            as={TAB_ICONS[route.name as keyof typeof TAB_ICONS]}
            color={color}
            size={size}
          />
        ),
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Accueil",
          tabBarLabel: "Accueil",
        }}
      />
      <Tabs.Screen
        name="metier"
        options={{
          title: "Metiers",
          tabBarLabel: "Metiers",
        }}
      />
      <Tabs.Screen
        name="favoris"
        options={{
          title: "Favoris",
          tabBarLabel: "Favoris",
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Compte",
          tabBarLabel: "Compte",
        }}
      />
    </Tabs>
  );
}
