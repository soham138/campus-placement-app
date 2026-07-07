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
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import api from "../services/api";

export default function AdminJobsScreen() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Modal State
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    let list = jobs;
    if (search !== "") {
      list = list.filter(
        (job) =>
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.company.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredJobs(list);
  }, [search, jobs]);

  useFocusEffect(
    useCallback(() => {
      fetchJobs();
    }, [])
  );

  const fetchJobs = async () => {
    try {
      const response = await api.get("/jobs");
      setJobs(response.data);
      setFilteredJobs(response.data);
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

  const openJobDetails = (job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const renderJob = ({ item }) => (
    <View style={styles.card}>
      {/* Tappable Area for Modal */}
      <TouchableOpacity 
        activeOpacity={0.7} 
        onPress={() => openJobDetails(item)}
      >
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
            <View style={styles.applicantRow}>
              <Ionicons name="people" size={15} color="#6366F1" />
              <Text style={styles.applicantText}>
                {item.applicants || 0} Applicants
              </Text>
            </View>
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
      </TouchableOpacity>

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
        
        {/* Header & Search */}
        <View style={styles.headerContainer}>
          <Text style={styles.greeting}>Admin Portal</Text>
          <Text style={styles.pageTitle}>Manage Jobs</Text>

          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color="#94A3B8" />
            <TextInput
              placeholder="Search by title or company..."
              placeholderTextColor="#94A3B8"
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
              autoCorrect={false}
            />
          </View>
        </View>

        {/* Job List */}
        <FlatList
          data={filteredJobs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderJob}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="briefcase-outline" size={48} color="#CBD5E1" />
              <Text style={styles.emptyText}>
                {search ? "No jobs match your search" : "No jobs posted yet"}
              </Text>
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

      {/* Elegant Details Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            
            <View style={styles.modalHeader}>
              <View style={styles.modalIconWrapper}>
                <Ionicons name="briefcase" size={24} color="#6366F1" />
              </View>
              <Text style={styles.modalTitle}>Job Details</Text>
            </View>

            {selectedJob && (
              <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                
                <View style={styles.modalDetailBlock}>
                  <Text style={styles.modalLabel}>Role / Title</Text>
                  <Text style={styles.modalValue}>{selectedJob.title}</Text>
                </View>

                <View style={styles.modalDetailBlock}>
                  <Text style={styles.modalLabel}>Company</Text>
                  <Text style={styles.modalValue}>{selectedJob.company}</Text>
                </View>

                <View style={styles.modalDetailBlock}>
                  <Text style={styles.modalLabel}>Location</Text>
                  <Text style={styles.modalValue}>{selectedJob.location}</Text>
                </View>
                
                <View style={styles.modalDetailBlock}>
                  <Text style={styles.modalLabel}>Total Applicants</Text>
                  <Text style={[styles.modalValue, { color: "#6366F1" }]}>
                    {selectedJob.applicants || 0} Students Applied
                  </Text>
                </View>

                <View style={[styles.modalDetailBlock, { borderBottomWidth: 0, paddingBottom: 0 }]}>
                  <Text style={styles.modalLabel}>Description</Text>
                  <Text style={styles.modalDescriptionText}>{selectedJob.description}</Text>
                </View>

              </ScrollView>
            )}

            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setModalVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.modalCloseText}>Done</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
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
    paddingHorizontal: 20,
    marginBottom: 16,
    marginTop: Platform.OS === "android" ? 45 : 25, 
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

  // Search Box Styles
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginTop: 20,
    height: 56,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#1E293B",
    fontWeight: "500",
  },

  // List Styles
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, 
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

  // Card Styles
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
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
  applicantRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  applicantText: {
    marginLeft: 6,
    color: "#6366F1",
    fontWeight: "700",
    fontSize: 13,
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
    backgroundColor: "#EEF2FF",
  },
  deleteBtn: {
    backgroundColor: "#FEF2F2",
  },
  actionText: {
    fontSize: 15,
    fontWeight: "700",
  },

  // Sticky Footer
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
    backgroundColor: "#6366F1",
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

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.4)", // Dark slate overlay
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 24,
    maxHeight: "80%", // Ensures it doesn't overflow the screen
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  modalIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1E293B",
  },
  modalBody: {
    backgroundColor: "#F8FAFC",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  modalDetailBlock: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  modalLabel: {
    fontSize: 13,
    color: "#94A3B8",
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  modalValue: {
    fontSize: 16,
    color: "#1E293B",
    fontWeight: "700",
  },
  modalDescriptionText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 24,
    marginTop: 4,
  },
  modalCloseBtn: {
    backgroundColor: "#6366F1",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  modalCloseText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});