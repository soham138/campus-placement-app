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
      // NOTE: Ensure your backend '/admin/dashboard' endpoint counts ONLY 
      // users where role === 'STUDENT' for the totalStudents property.
      const response = await api.get("/admin/dashboard");
      setData(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to load dashboard data");
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
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.greeting}>Admin Portal</Text>
            <Text style={styles.title}>Dashboard</Text>
          </View>
          <TouchableOpacity 
            style={styles.logoutIconBtn} 
            onPress={logout}
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={24} color="#EF4444" />
          </TouchableOpacity>
        </View>

        {/* Bento Grid Stats */}
        <View style={styles.grid}>
          
          {/* Main Stat Card - Students */}
          <View style={[styles.card, styles.primaryCard]}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconWrapper, { backgroundColor: "#EEF2FF" }]}>
                <Ionicons name="people" size={28} color="#6366F1" />
              </View>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.number}>{data.totalStudents}</Text>
              <Text style={styles.cardTitle}>Registered Students</Text>
            </View>
          </View>

          {/* Split Row for Jobs & Applications */}
          <View style={styles.row}>
            
            {/* Total Jobs Card */}
            <View style={[styles.card, styles.halfCard]}>
              <View style={styles.cardHeader}>
                <View style={[styles.iconWrapper, { backgroundColor: "#FFF7ED", width: 40, height: 40 }]}>
                  <Ionicons name="briefcase" size={20} color="#F59E0B" />
                </View>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.numberSmall}>{data.totalJobs}</Text>
                <Text style={styles.cardTitleSmall}>Total Jobs</Text>
              </View>
            </View>

            {/* Total Applications Card */}
            <View style={[styles.card, styles.halfCard]}>
              <View style={styles.cardHeader}>
                <View style={[styles.iconWrapper, { backgroundColor: "#ECFDF5", width: 40, height: 40 }]}>
                  <Ionicons name="document-text" size={20} color="#10B981" />
                </View>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.numberSmall}>{data.totalApplications}</Text>
                <Text style={styles.cardTitleSmall}>Applications</Text>
              </View>
            </View>

          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Slate background
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 40 : 20,
    paddingBottom: 40,
  },

  // Header Styles
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    marginTop: 10,
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
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
  logoutIconBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FEF2F2", // Soft red background
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },

  // Grid Layout
  grid: {
    display: "flex",
    gap: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },

  // Base Card Styles
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },

  // Primary Card (Students)
  primaryCard: {
    marginBottom: 16,
    minHeight: 180,
    justifyContent: "space-between",
  },
  
  // Half Cards (Jobs & Apps)
  halfCard: {
    flex: 1,
    minHeight: 160,
    padding: 20,
    justifyContent: "space-between",
  },

  // Card Content
  cardHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  cardBody: {
    marginTop: 16,
  },

  // Typography for Primary Card
  number: {
    fontSize: 48,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "600",
  },

  // Typography for Half Cards
  numberSmall: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 4,
  },
  cardTitleSmall: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "600",
  },
});