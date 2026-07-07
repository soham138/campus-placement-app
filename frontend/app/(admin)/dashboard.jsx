import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  Alert,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import api from "../../src/services/api";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await api.get("/admin/dashboard");
      setData(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert("Error", "Unable to load dashboard");
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
          router.replace("/login");
        },
      },
    ]);
  };

  if (!data) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Admin Portal</Text>
            <Text style={styles.title}>Dashboard</Text>
          </View>

          <TouchableOpacity
            style={styles.logoutIconBtn}
            onPress={logout}
          >
            <Ionicons
              name="log-out-outline"
              size={24}
              color="#EF4444"
            />
          </TouchableOpacity>
        </View>

        {/* Students */}
        <View style={[styles.card, styles.primaryCard]}>
          <View style={styles.cardHeader}>
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: "#EEF2FF" },
              ]}
            >
              <Ionicons
                name="people"
                size={28}
                color="#6366F1"
              />
            </View>
          </View>

          <View style={styles.cardBody}>
            <Text style={styles.number}>
              {data.totalStudents}
            </Text>

            <Text style={styles.cardTitle}>
              Registered Students
            </Text>
          </View>
        </View>

        {/* Jobs + Applications */}
        <View style={styles.row}>
          <View style={[styles.card, styles.halfCard]}>
            <View
              style={[
                styles.smallIcon,
                { backgroundColor: "#FFF7ED" },
              ]}
            >
              <Ionicons
                name="briefcase"
                size={22}
                color="#F59E0B"
              />
            </View>

            <Text style={styles.numberSmall}>
              {data.totalJobs}
            </Text>

            <Text style={styles.cardTitleSmall}>
              Jobs
            </Text>
          </View>

          <View style={[styles.card, styles.halfCard]}>
            <View
              style={[
                styles.smallIcon,
                { backgroundColor: "#ECFDF5" },
              ]}
            >
              <Ionicons
                name="document-text"
                size={22}
                color="#10B981"
              />
            </View>

            <Text style={styles.numberSmall}>
              {data.totalApplications}
            </Text>

            <Text style={styles.cardTitleSmall}>
              Applications
            </Text>
          </View>
        </View>

        {/* Approved + Pending */}
        <View style={styles.row}>
          <View style={[styles.card, styles.halfCard]}>
            <View
              style={[
                styles.smallIcon,
                { backgroundColor: "#DCFCE7" },
              ]}
            >
              <Ionicons
                name="checkmark-circle"
                size={22}
                color="#22C55E"
              />
            </View>

            <Text style={styles.numberSmall}>
              {data.approvedApplications}
            </Text>

            <Text style={styles.cardTitleSmall}>
              Approved
            </Text>
          </View>

          <View style={[styles.card, styles.halfCard]}>
            <View
              style={[
                styles.smallIcon,
                { backgroundColor: "#FEF9C3" },
              ]}
            >
              <Ionicons
                name="time"
                size={22}
                color="#EAB308"
              />
            </View>

            <Text style={styles.numberSmall}>
              {data.pendingApplications}
            </Text>

            <Text style={styles.cardTitleSmall}>
              Pending
            </Text>
          </View>
        </View>

        {/* Rejected */}
        <View style={[styles.card, styles.primaryCard]}>
          <View style={styles.cardHeader}>
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: "#FEE2E2" },
              ]}
            >
              <Ionicons
                name="close-circle"
                size={28}
                color="#EF4444"
              />
            </View>
          </View>

          <View style={styles.cardBody}>
            <Text style={styles.number}>
              {data.rejectedApplications}
            </Text>

            <Text style={styles.cardTitle}>
              Rejected Applications
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 40 : 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  greeting: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "600",
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A",
  },

  logoutIconBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FEF2F2",
    justifyContent: "center",
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 3,
  },

  primaryCard: {
    marginBottom: 16,
  },

  halfCard: {
    width: "48%",
  },

  cardHeader: {
    marginBottom: 15,
  },

  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  smallIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  cardBody: {
    marginTop: 5,
  },

  number: {
    fontSize: 42,
    fontWeight: "800",
    color: "#1E293B",
  },

  numberSmall: {
    fontSize: 30,
    fontWeight: "800",
    color: "#1E293B",
  },

  cardTitle: {
    marginTop: 6,
    fontSize: 16,
    color: "#64748B",
    fontWeight: "600",
  },

  cardTitleSmall: {
    marginTop: 5,
    fontSize: 14,
    color: "#64748B",
    fontWeight: "600",
  },
});