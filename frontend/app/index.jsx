import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import api from "../src/services/api";

export default function Index() {
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {

  const token = await SecureStore.getItemAsync("token");
  const role = await SecureStore.getItemAsync("role");

  if (!token) {
    router.replace("/login");
    return;
  }

  try {

    if (role === "ADMIN") {

      await api.get("/admin/dashboard");
      router.replace("/(admin)/dashboard");

    } else {

      await api.get("/jobs");
      router.replace("/(student)/home");

    }

  } catch (error) {

    // Don't do anything here.
    // api.js will automatically logout
    // if token is expired.

  }

};

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}