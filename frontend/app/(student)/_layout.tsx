import { Tabs } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function StudentLayout() {

  const colorScheme = useColorScheme();

  return (

    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor:
          Colors[colorScheme ?? "light"].tint,
      }}
    >

      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              name="house.fill"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="jobs"
        options={{
          title: "Jobs",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              name="paperplane.fill"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="applications"
        options={{
          title: "Applications",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              name="doc.text.fill"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              name="person.fill"
              size={24}
              color={color}
            />
          ),
        }}
      />

    </Tabs>

  );
}