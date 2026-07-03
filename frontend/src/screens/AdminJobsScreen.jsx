import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import api from "../services/api";

export default function AdminJobsScreen() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchJobs();
    }, [])
  );

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

  const deleteJob = (id) => {
    Alert.alert(
      "Delete Job",
      "Are you sure you want to delete this job? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/jobs/${id}`);
              Alert.alert("Success", "Job posting removed successfully");
              fetchJobs(); // Refresh the list
            } catch {
              Alert.alert("Error", "Failed to delete the job");
            }
          },
        },
      ]
    );
  };

  const renderJob = ({ item }) => (
    <View style={styles.card}>
      {/* Top Header: Icon + Title + Company */}
      <View style={styles.cardHeader}>
        <View style={styles.iconWrapper}>
          <Ionicons name="business" size={24} color="#6366F1" />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.jobTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.company} numberOfLines={1}>
            {item.company}
          </Text>
        </View>
      </View>

      {/* Location Row */}
      <View style={styles.locationRow}>
        <Ionicons name="location" size={16} color="#94A3B8" />
        <Text style={styles.locationText}>{item.location}</Text>
      </View>

      {/* Description */}
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.divider} />

      {/* Action Buttons Row */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.editBtn]}
          onPress={() =>
            router.push({
              pathname: "/(admin)/edit-job",
              params: { id: item.id },
            })
          }
          activeOpacity={0.7}
        >
          <Ionicons name="create-outline" size={18} color="#6366F1" />
          <Text style={[styles.actionText, { color: "#6366F1" }]}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.deleteBtn]}
          onPress={() => deleteJob(item.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={18} color="#EF4444" />
          <Text style={[styles.actionText, { color: "#EF4444" }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.greeting}>Admin Portal</Text>
      <Text style={styles.pageTitle}>Manage Jobs</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Job List */}
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderJob}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="briefcase-outline" size={48} color="#CBD5E1" />
              <Text style={styles.emptyText}>No jobs posted yet</Text>
            </View>
          }
        />

        {/* Sticky Add Job Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/(admin)/add-job")}
            activeOpacity={0.8}
          >
            <Ionicons name="add-circle" size={24} color="#FFFFFF" />
            <Text style={styles.addText}>Create New Job</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Slate background
  },
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  
  // Header Styles
  headerContainer: {
    marginBottom: 24,
    marginTop: Platform.OS === "android" ? 20 : 10,
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

  // List Styles
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Extra padding so bottom items aren't hidden by the sticky footer
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#94A3B8",
    fontWeight: "600",
    marginTop: 12,
  },

  // Card Styles (Bento Theme)
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
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
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  company: {
    fontSize: 15,
    color: "#64748B",
    fontWeight: "500",
  },

  // Location Row
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
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
    marginBottom: 16,
  },
  
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginBottom: 16,
  },

  // Action Buttons Row
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  editBtn: {
    backgroundColor: "#EEF2FF", // Soft Indigo
  },
  deleteBtn: {
    backgroundColor: "#FEF2F2", // Soft Red
  },
  actionText: {
    fontSize: 15,
    fontWeight: "700",
  },

  // Sticky Footer & Add Button
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 30 : 20,
    backgroundColor: "rgba(248, 250, 252, 0.9)", // Blends with background
  },
  addButton: {
    backgroundColor: "#6366F1", // Primary Indigo
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});