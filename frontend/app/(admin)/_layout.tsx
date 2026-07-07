import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function AdminLayout() {
  // Gets exact device measurements to prevent overlapping with system navigation
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6366F1", // Primary Indigo
        tabBarInactiveTintColor: "#94A3B8", // Muted Slate
        
        // Modern Floating Tab Bar Styling
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0, 
          elevation: 10, // Shadow for Android
          shadowColor: "#000", // Shadow for iOS
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          // Dynamically adjust height and padding based on the device
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="chart.bar.fill" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="students"
        options={{
          title: "Students",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="person.3.fill" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="jobs"
        options={{
          title: "Jobs",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="briefcase.fill" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="applications"
        options={{
          title: "Applications",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="doc.text.fill" size={24} color={color} />
          ),
        }}
      />

      {/* Hidden Screens inside the Tabs Layout */}
      <Tabs.Screen
        name="add-job"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="edit-job"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}