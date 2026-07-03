import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";

export default function AdminApplicationsScreen() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const response = await api.get("/admin/applications");
      setApplications(response.data);
    } catch (e) {
      Alert.alert("Error", "Unable to load applications");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/applications/update-status/${id}?status=${status}`);
      loadApplications();
    } catch (e) {
      Alert.alert("Error", "Failed to update status");
    }
  };

  // Helper function to color-code the status badge
  const getStatusStyle = (status = "PENDING") => {
    const s = status.toUpperCase();
    if (s === "APPROVED") return { bg: "#D1FAE5", text: "#065F46" }; // Emerald
    if (s === "REJECTED") return { bg: "#FEE2E2", text: "#991B1B" }; // Red
    return { bg: "#FEF3C7", text: "#92400E" }; // Amber/Pending
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.greeting}>Admin Portal</Text>
      <Text style={styles.pageTitle}>Review Applications</Text>
    </View>
  );

  const renderItem = ({ item }) => {
    const statusConfig = getStatusStyle(item.status);

    return (
      <View style={styles.card}>
        
        {/* Top Row: Avatar & Student Info */}
        <View style={styles.cardHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {item.studentName ? item.studentName.charAt(0).toUpperCase() : "U"}
            </Text>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.name} numberOfLines={1}>{item.studentName}</Text>
            <Text style={styles.email} numberOfLines={1}>{item.email}</Text>
          </View>
          {/* Status Badge */}
          <View style={[styles.statusPill, { backgroundColor: statusConfig.bg }]}>
            <Text style={[styles.statusText, { color: statusConfig.text }]}>
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Middle Row: Job & User Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Ionicons name="briefcase-outline" size={16} color="#94A3B8" />
            <Text style={styles.detailText}>
              Applying for: <Text style={styles.detailBold}>{item.jobTitle}</Text>
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="finger-print-outline" size={16} color="#94A3B8" />
            <Text style={styles.detailText}>User ID: {item.userId}</Text>
          </View>
        </View>

        {/* Bottom Row: Actions */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.approveBtn]}
            onPress={() => updateStatus(item.applicationId, "APPROVED")}
            activeOpacity={0.8}
          >
            <Ionicons name="checkmark-circle-outline" size={18} color="#FFFFFF" />
            <Text style={styles.approveText}>Approve</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.rejectBtn]}
            onPress={() => updateStatus(item.applicationId, "REJECTED")}
            activeOpacity={0.8}
          >
            <Ionicons name="close-circle-outline" size={18} color="#EF4444" />
            <Text style={styles.rejectText}>Reject</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#6366F1" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={applications}
        keyExtractor={(item) => item.applicationId.toString()}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={48} color="#CBD5E1" />
            <Text style={styles.emptyText}>No applications found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Slate background matching theme
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
    paddingBottom: 40,
    paddingTop: 10,
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
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#6366F1", // Indigo
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  headerText: {
    flex: 1,
    paddingRight: 8,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 2,
  },
  email: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },
  
  // Status Pill
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 16,
  },

  // Details Section
  detailsContainer: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#64748B",
    marginLeft: 8,
  },
  detailBold: {
    fontWeight: "700",
    color: "#1E293B",
  },

  // Action Buttons
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
  approveBtn: {
    backgroundColor: "#10B981", // Solid Emerald Green
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  approveText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  rejectBtn: {
    backgroundColor: "#FEF2F2", // Soft Red Background
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  rejectText: {
    color: "#EF4444", // Deep Red Text
    fontSize: 15,
    fontWeight: "700",
  },
});