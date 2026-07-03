import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";

export default function AddJobScreen() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  
  const [isSaving, setIsSaving] = useState(false);

  const saveJob = async () => {
    if (!title || !company || !location || !description) {
      Alert.alert("Missing Fields", "Please fill in all the job details before saving.");
      return;
    }

    Keyboard.dismiss();
    setIsSaving(true);

    try {
      await api.post("/jobs", {
        title,
        company,
        location,
        description,
      });

      Alert.alert("Success", "New job posted successfully 🎉");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Unable to add job. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView 
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
          >
            
            {/* Header Section */}
            <View style={styles.headerContainer}>
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => router.back()}
                activeOpacity={0.8}
              >
                <Ionicons name="arrow-back" size={24} color="#1E293B" />
              </TouchableOpacity>
              <Text style={styles.greeting}>Admin Portal</Text>
              <Text style={styles.pageTitle}>Create New Job</Text>
            </View>

            {/* Form Card (Bento Style) */}
            <View style={styles.card}>
              
              {/* Job Title Input */}
              <View style={styles.inputContainer}>
                <View style={styles.iconBox}>
                  <Ionicons name="briefcase-outline" size={20} color="#6366F1" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Job Title (e.g., Software Engineer)"
                  placeholderTextColor="#94A3B8"
                  value={title}
                  onChangeText={setTitle}
                />
              </View>

              {/* Company Input */}
              <View style={styles.inputContainer}>
                <View style={styles.iconBox}>
                  <Ionicons name="business-outline" size={20} color="#6366F1" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Company Name"
                  placeholderTextColor="#94A3B8"
                  value={company}
                  onChangeText={setCompany}
                />
              </View>

              {/* Location Input */}
              <View style={styles.inputContainer}>
                <View style={styles.iconBox}>
                  <Ionicons name="location-outline" size={20} color="#6366F1" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Location (e.g., Remote, New York)"
                  placeholderTextColor="#94A3B8"
                  value={location}
                  onChangeText={setLocation}
                />
              </View>

              {/* Description Input (Multiline) */}
              <View style={[styles.inputContainer, styles.textAreaContainer]}>
                <View style={styles.iconBox}>
                  <Ionicons name="document-text-outline" size={20} color="#6366F1" />
                </View>
                <TextInput
                  style={styles.textArea}
                  multiline
                  numberOfLines={5}
                  placeholder="Detailed Job Description & Requirements"
                  placeholderTextColor="#94A3B8"
                  value={description}
                  onChangeText={setDescription}
                  textAlignVertical="top" // Ensure text starts at the top on Android
                />
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.primaryButton, isSaving && styles.buttonDisabled]}
              onPress={saveJob}
              disabled={isSaving}
              activeOpacity={0.8}
            >
              {isSaving ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <Ionicons name="paper-plane-outline" size={20} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Publish Job</Text>
                </>
              )}
            </TouchableOpacity>

          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Slate background matching theme
  },
  flex: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 40 : 10,
    paddingBottom: 40,
  },

  // Header Styles
  headerContainer: {
    marginBottom: 24,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  greeting: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "600",
    marginBottom: 4,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.5,
  },

  // Card & Input Styles (Bento Theme)
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    minHeight: 56,
    marginBottom: 12,
    paddingRight: 16,
  },
  iconBox: {
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1E293B",
    fontWeight: "500",
  },
  
  // Text Area Specific Styles
  textAreaContainer: {
    alignItems: "flex-start",
    marginBottom: 0,
  },
  textArea: {
    flex: 1,
    fontSize: 16,
    color: "#1E293B",
    fontWeight: "500",
    paddingTop: 16,
    paddingBottom: 16,
    minHeight: 120,
  },

  // Button Styles
  primaryButton: {
    backgroundColor: "#6366F1", // Primary Indigo
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    borderRadius: 16,
    gap: 8,
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: "#94A3B8",
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});