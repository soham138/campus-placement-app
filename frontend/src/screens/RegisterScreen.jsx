import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import api from "../services/api";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const register = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    Keyboard.dismiss();
    setIsLoading(true);

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      Alert.alert("Success", "Account Created Successfully 🎉");
      router.replace("/"); // Send user back to login screen
    } catch (error) {
      Alert.alert("Registration Failed", "Unable to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            
            {/* Header Section */}
            <View style={styles.header}>
              <View style={styles.iconWrapper}>
                <Ionicons name="person-add" size={32} color="#6366F1" />
              </View>
              <Text style={styles.greeting}>Join Us,</Text>
              <Text style={styles.title}>Create Account</Text>
            </View>

            {/* Input Card */}
            <View style={styles.card}>
              
              {/* Name Input */}
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#94A3B8" />
                <TextInput
                  placeholder="Full Name"
                  placeholderTextColor="#94A3B8"
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#94A3B8" />
                <TextInput
                  placeholder="Email Address"
                  placeholderTextColor="#94A3B8"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#94A3B8" />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#94A3B8"
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

            </View>

            {/* Register Button */}
            <TouchableOpacity
              style={[styles.primaryButton, isLoading && styles.buttonDisabled]}
              onPress={register}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <Text style={styles.buttonText}>Sign Up</Text>
                  <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                </>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.replace("/")}>
                <Text style={styles.loginText}>Log In</Text>
              </TouchableOpacity>
            </View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Slate background
  },
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  // Header Styles
  header: {
    marginBottom: 40,
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#EEF2FF", // Soft Indigo
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 18,
    color: "#64748B",
    fontWeight: "600",
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.5,
  },

  // Card & Input Styles
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 8,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#1E293B",
    fontWeight: "500",
  },

  // Button Styles
  primaryButton: {
    backgroundColor: "#6366F1", // Indigo
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  buttonDisabled: {
    backgroundColor: "#94A3B8",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  // Footer Styles
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  footerText: {
    color: "#64748B",
    fontSize: 15,
  },
  loginText: {
    color: "#6366F1",
    fontSize: 15,
    fontWeight: "700",
  },
}); 