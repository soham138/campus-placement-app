import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>
        Welcome to Campus Placement App
      </Text>

      <Button
        title="View Jobs"
        onPress={() =>
          router.push("/jobs")
        }
      />
    </View>
  );
}