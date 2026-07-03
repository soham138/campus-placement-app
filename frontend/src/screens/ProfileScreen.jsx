import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  useColorScheme,
} from "react-native";

import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

import api from "../services/api";
import { lightTheme, darkTheme } from "../constants/theme";

export default function ProfileScreen() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const colorScheme = useColorScheme();

  const theme =
    colorScheme === "dark"
      ? darkTheme
      : lightTheme;

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/users/profile");
      setProfile(response.data);
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

 const logout = async () => {
  await SecureStore.deleteItemAsync("token");
  await SecureStore.deleteItemAsync("userId");
  await SecureStore.deleteItemAsync("role");

  console.log("User Logged Out");

  router.replace("/");
};

  if (loading) {
    return (
      <View
        style={[
          styles.loader,
          {
            backgroundColor: theme.background,
          },
        ]}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (!profile) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Profile not found</Text>
    </View>
  );
}

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <Text
          style={[
            styles.heading,
            {
              color: theme.text,
            },
          ]}
        >
          My Profile
        </Text>

        <Text
          style={[
            styles.label,
            {
              color: theme.text,
            },
          ]}
        >
          Name
        </Text>

        <Text
          style={[
            styles.value,
            {
              color: theme.text,
            },
          ]}
        >
          {profile.name}
        </Text>

        <Text
          style={[
            styles.label,
            {
              color: theme.text,
            },
          ]}
        >
          Email
        </Text>

        <Text
          style={[
            styles.value,
            {
              color: theme.text,
            },
          ]}
        >
          {profile.email}
        </Text>

        <Text
          style={[
            styles.label,
            {
              color: theme.text,
            },
          ]}
        >
          Role
        </Text>

        <Text
          style={[
            styles.value,
            {
              color: theme.text,
            },
          ]}
        >
          {profile.role}
        </Text>

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: "#E53935",
            },
          ]}
          onPress={logout}
        >
          <Text style={styles.buttonText}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },

  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },

  value: {
    fontSize: 16,
    marginBottom: 10,
  },

  button: {
    marginTop: 25,
    padding: 14,
    borderRadius: 8,
  },

  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

});