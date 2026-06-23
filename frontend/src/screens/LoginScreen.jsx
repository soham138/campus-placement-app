import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  useColorScheme,
} from "react-native";

import api from "../services/api";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { lightTheme, darkTheme } from "../constants/theme";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  const login = async () => {

  try {

    const response =
      await api.post("/auth/login", {
        email,
        password,
      });

    const token =
      response.data.token;

    const userId =
      response.data.userId;

    await SecureStore.setItemAsync(
      "token",
      token
    );

    await SecureStore.setItemAsync(
      "userId",
      userId.toString()
    );

    await SecureStore.setItemAsync(
  "userId",
  userId.toString()
);

console.log(
  "Saved User ID:",
  userId
);

    Alert.alert(
      "Success",
      "Login Successful"
    );

    router.replace("/home");

  } catch (error) {

    Alert.alert(
      "Error",
      "Invalid Credentials"
    );

  }
};



  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: theme.text },
        ]}
      >
        Campus Placement Login
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor={
          colorScheme === "dark" ? "#999" : "#666"
        }
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            color: theme.text,
            borderColor: theme.border,
          },
        ]}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={
          colorScheme === "dark" ? "#999" : "#666"
        }
        secureTextEntry
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            color: theme.text,
            borderColor: theme.border,
          },
        ]}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: theme.button },
        ]}
        onPress={login}
      >
        <Text style={styles.buttonText}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
  onPress={() => router.push("/register")}
>
  <Text
    style={{
      textAlign: "center",
      marginTop: 20,
      color: theme.button,
      fontWeight: "bold",
    }}
  >
    Create New Account
  </Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: "center",
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },

  button: {
    padding: 14,
    borderRadius: 8,
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});