import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

import LoginScreen from "../src/screens/LoginScreen";

export default function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {

  const token = await SecureStore.getItemAsync("token");
  const role = await SecureStore.getItemAsync("role");

  if (token) {

    if (role === "ADMIN") {

      router.replace("/(admin)/dashboard");

    } else {

      router.replace("/(student)/home");

    }

  } else {

    setLoading(false);

  }

};

  return <LoginScreen />;
}