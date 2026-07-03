import { IconSymbol } from "@/components/ui/icon-symbol";
import { Tabs } from "expo-router";

export default function AdminLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>

      <Tabs.Screen
  name="dashboard"
  options={{
    title: "Dashboard",
    tabBarIcon: ({ color }) => (
      <IconSymbol name="chart.bar.fill" color={color} />
    ),
  }}
/>

<Tabs.Screen
  name="students"
  options={{
    title: "Students",
    tabBarIcon: ({ color }) => (
      <IconSymbol name="person.3.fill" color={color} />
    ),
  }}
/>

<Tabs.Screen
  name="jobs"
  options={{
    title: "Jobs",
    tabBarIcon: ({ color }) => (
      <IconSymbol name="briefcase.fill" color={color} />
    ),
  }}
/>

<Tabs.Screen
  name="applications"
  options={{
    title: "Applications",
    tabBarIcon: ({ color }) => (
      <IconSymbol name="doc.text.fill" color={color} />
    ),
  }}
/>

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