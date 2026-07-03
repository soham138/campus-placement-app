import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import api from "../services/api";

export default function ProfileScreen() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/users/profile");
      setProfile(response.data);
    } catch {
      Alert.alert("Error", "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const uploadResume = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;
      setUploading(true);

      const file = result.assets[0];
      const formData = new FormData();

      formData.append("file", {
        uri: file.uri,
        name: file.name,
        type: "application/pdf",
      });

      await api.post("/users/upload-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Alert.alert("Success", "Resume Uploaded Successfully 🎉");
      fetchProfile(); // Refresh profile to show updated resume status
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Resume Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  const logout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await SecureStore.deleteItemAsync("token");
          await SecureStore.deleteItemAsync("userId");
          await SecureStore.deleteItemAsync("role");
          router.replace("/");
        },
      },
    ]);
  };

  // Helper to generate initials for the avatar
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.loader}>
        <Ionicons name="warning-outline" size={48} color="#94A3B8" />
        <Text style={styles.errorText}>Profile not found</Text>
      </View>
    );
  }

  const hasResume = !!profile.resume;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Page Header */}
        <View style={styles.headerSection}>
          <Text style={styles.greeting}>Account Settings</Text>
          <Text style={styles.title}>My Profile</Text>
        </View>

        {/* PROFILE INFO CARD */}
        <View style={styles.card}>
          <View style={styles.avatarSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{getInitials(profile.name)}</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.userName}>{profile.name}</Text>
              <View style={styles.rolePill}>
                <Text style={styles.roleText}>{profile.role || "Student"}</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.iconBoxLight}>
              <Ionicons name="mail" size={18} color="#64748B" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Email Address</Text>
              <Text style={styles.infoValue}>{profile.email}</Text>
            </View>
          </View>
        </View>

        {/* RESUME CARD */}
        <View style={styles.card}>
          <View style={styles.resumeHeader}>
            <View
              style={[
                styles.iconBoxSolid,
                { backgroundColor: hasResume ? "#ECFDF5" : "#FEF3C7" },
              ]}
            >
              <Ionicons
                name="document-text"
                size={22}
                color={hasResume ? "#10B981" : "#D97706"}
              />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Resume / CV</Text>
              <Text
                style={[
                  styles.infoValue,
                  { color: hasResume ? "#10B981" : "#D97706" },
                ]}
              >
                {hasResume ? "Uploaded & Ready" : "No Resume Uploaded"}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.primaryButton, uploading && styles.buttonDisabled]}
            onPress={uploadResume}
            disabled={uploading}
            activeOpacity={0.8}
          >
            {uploading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Ionicons name="cloud-upload-outline" size={20} color="#FFFFFF" />
            )}
            <Text style={styles.primaryButtonText}>
              {uploading
                ? "Uploading..."
                : hasResume
                ? "Update Resume (PDF)"
                : "Upload Resume (PDF)"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* LOGOUT BUTTON */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Matches the Slate background of the app
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 40 : 10,
    paddingBottom: 40,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: "#64748B",
    fontWeight: "500",
  },

  // Header Section
  headerSection: {
    marginBottom: 32,
    marginTop: 10,
  },
  greeting: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "600",
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A",
    lineHeight: 40,
  },

  // Base Card Style (Matches Bento-box theme)
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },

  // Avatar Section
  avatarSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#6366F1", // Indigo
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  nameContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 6,
  },
  rolePill: {
    alignSelf: "flex-start",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
    textTransform: "capitalize",
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 20,
  },

  // Info Rows
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBoxLight: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: "#94A3B8",
    fontWeight: "600",
    marginBottom: 2,
    textTransform: "uppercase",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },

  // Resume Section
  resumeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  iconBoxSolid: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  
  // Buttons
  primaryButton: {
    backgroundColor: "#6366F1", // Indigo primary
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  buttonDisabled: {
    backgroundColor: "#94A3B8",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  // Logout Button (Soft red style)
  logoutButton: {
    backgroundColor: "#FEF2F2",
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  logoutButtonText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "700",
  },
});