import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";

export default function MyApplicationsScreen() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get("/applications/my-applications");
      setApplications(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to color-code the status badge
  const getStatusStyle = (status = "Pending") => {
    const s = status.toLowerCase();
    if (s.includes("accept") || s.includes("select") || s.includes("hire")) {
      return { bg: "#D1FAE5", text: "#065F46" }; // Emerald Green
    }
    if (s.includes("reject") || s.includes("decline")) {
      return { bg: "#FEE2E2", text: "#991B1B" }; // Red
    }
    if (s.includes("review") || s.includes("progress") || s.includes("shortlist")) {
      return { bg: "#DBEAFE", text: "#1E40AF" }; // Blue
    }
    // Default (Pending, Applied, etc.)
    return { bg: "#FEF3C7", text: "#92400E" }; // Amber/Yellow
  };

  const renderHeader = () => (
    <View style={styles.welcomeSection}>
      <Text style={styles.greeting}>Track Progress</Text>
      <Text style={styles.title}>My Applications</Text>
    </View>
  );

  const renderItem = ({ item }) => {
    const statusConfig = getStatusStyle(item.status);

    return (
      <View style={styles.card}>
        
        {/* Top Header: Icon + Title + Company */}
        <View style={styles.cardHeader}>
          {/* Using the soft green from the HomeScreen "Applications" card */}
          <View style={styles.iconWrapper}>
            <Ionicons name="document-text" size={24} color="#10B981" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.jobTitle} numberOfLines={1}>
              {item.jobTitle}
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

        {/* Divider */}
        <View style={styles.divider} />

        {/* Bottom Status Row */}
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Current Status</Text>
          <View style={[styles.statusPill, { backgroundColor: statusConfig.bg }]}>
            <Text style={[styles.statusText, { color: statusConfig.text }]}>
              {item.status || "Pending"}
            </Text>
          </View>
        </View>

      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={applications}
        renderItem={renderItem}
        keyExtractor={(item) => item.applicationId.toString()}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        // Shows a nice empty state if the user hasn't applied to anything yet
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="folder-open-outline" size={48} color="#CBD5E1" />
            <Text style={styles.emptyText}>No applications yet.</Text>
            <Text style={styles.emptySubtext}>Jobs you apply to will appear here.</Text>
          </View>
        }
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
    flexGrow: 1,
  },

  // Page Header
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

  // Card Styles matching Bento theme
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
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#ECFDF5", // Soft Emerald background matching Home
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

  // Location Row
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  locationText: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "600",
    marginLeft: 6,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginBottom: 16,
  },

  // Status Row
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#94A3B8",
  },
  statusPill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // Empty State
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#475569",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 15,
    color: "#94A3B8",
    textAlign: "center",
  },
});