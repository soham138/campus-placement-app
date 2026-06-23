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

import { router } from "expo-router";
import api from "../services/api";
import { lightTheme, darkTheme } from "../constants/theme";

export default function RegisterScreen() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const colorScheme = useColorScheme();

  const theme =
    colorScheme === "dark"
      ? darkTheme
      : lightTheme;

  const register = async () => {

    try {

      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      Alert.alert(
        "Success",
        "Account Created Successfully"
      );

      router.replace("/");

    } catch (error) {

      Alert.alert(
        "Error",
        "Registration Failed"
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
        Create Account
      </Text>

      <TextInput
        placeholder="Name"
        placeholderTextColor="#777"
        value={name}
        onChangeText={setName}
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            color: theme.text,
            borderColor: theme.border,
          },
        ]}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            color: theme.text,
            borderColor: theme.border,
          },
        ]}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#777"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            color: theme.text,
            borderColor: theme.border,
          },
        ]}
      />

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: theme.button,
          },
        ]}
        onPress={register}
      >
        <Text style={styles.buttonText}>
          Register
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
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },

  button: {
    padding: 14,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

});