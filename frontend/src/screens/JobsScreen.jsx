import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Platform,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";

import api from "../services/api";

export default function JobsScreen() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applyingJobId, setApplyingJobId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get("/jobs");
      setJobs(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const applyJob = async (jobId) => {
    setApplyingJobId(jobId);
    try {
      const userId = await SecureStore.getItemAsync("userId");
      if (!userId) {
        Alert.alert("Error", "User not logged in");
        return;
      }

      await api.post("/applications/apply", { jobId: jobId });
      Alert.alert("Success", "Applied Successfully");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Alert.alert("Info", "You have already applied for this job");
      } else {
        Alert.alert("Error", "Application Failed");
      }
    } finally {
      setApplyingJobId(null);
    }
  };

  const renderHeader = () => (
    <View style={styles.welcomeSection}>
      <Text style={styles.greeting}>Discover Opportunities</Text>
      <Text style={styles.title}>Available Roles</Text>
    </View>
  );

  const renderJob = ({ item }) => {
    const isApplying = applyingJobId === item.id;

    return (
      <View style={styles.card}>
        
        {/* Card Header matching Home Screen Bento Icons */}
        <View style={styles.cardHeader}>
          <View style={styles.iconWrapper}>
            <Ionicons name="business" size={24} color="#6366F1" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.jobTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.company} numberOfLines={1}>{item.company}</Text>
          </View>
        </View>

        {/* Location Row */}
        <View style={styles.locationRow}>
          <Ionicons name="location" size={16} color="#94A3B8" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>

        {/* Description */}
        <Text style={styles.description} numberOfLines={3}>
          {item.description}
        </Text>

        {/* Apply Button (Matches the Primary Card style from Home) */}
        <TouchableOpacity
          style={[styles.applyButton, isApplying && styles.applyButtonDisabled]}
          disabled={isApplying}
          onPress={() => applyJob(item.id)}
          activeOpacity={0.8}
        >
          <Text style={styles.applyButtonText}>
            {isApplying ? "Submitting..." : "Apply Now"}
          </Text>
          {!isApplying && <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />}
        </TouchableOpacity>

      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderJob}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Matches Home Screen Slate background
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 40 : 10,
    paddingBottom: 40,
  },

  // Matches Home Screen "welcomeSection" perfectly
  welcomeSection: {
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

  // Matches Home Screen "card" base styles perfectly
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    marginBottom: 16,
  },

  // Card Internal Layout
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#EEF2FF", // Soft indigo background
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  company: {
    fontSize: 15,
    color: "#64748B",
    fontWeight: "500",
  },

  // Location
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  locationText: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "600",
    marginLeft: 6,
  },

  // Description
  description: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 22,
    marginBottom: 24,
  },

  // Apply Button (Matches the Home Screen's Indigo Primary Card)
  applyButton: {
    backgroundColor: "#6366F1", 
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8, // Adds space between text and icon (RN 0.71+)
  },
  applyButtonDisabled: {
    backgroundColor: "#CBD5E1", // Gray out when loading
  },
  applyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});