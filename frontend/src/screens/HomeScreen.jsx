import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";

export default function HomeScreen() {

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const response = await api.get("/users/dashboard");

      setDashboard(response.data);

    } catch (error) {

      console.log(error);

      Alert.alert("Error", "Unable to load dashboard");

    } finally {

      setLoading(false);

    }

  };

  const logout = () => {

    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {

            await SecureStore.deleteItemAsync("token");
            await SecureStore.deleteItemAsync("userId");

            router.replace("/");

          },
        },
      ]
    );

  };

  if (loading) {

    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color="#6366F1" />
      </SafeAreaView>
    );

  }

  return (

    <SafeAreaView style={styles.safeArea}>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.header}>

          <TouchableOpacity
            onPress={() => router.push("/profile")}
          >
            <Ionicons
              name="person-circle"
              size={46}
              color="#1E293B"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={logout}
          >
            <Ionicons
              name="log-out-outline"
              size={28}
              color="#64748B"
            />
          </TouchableOpacity>

        </View>

        <Text style={styles.welcome}>
          Welcome Back 👋
        </Text>

        <Text style={styles.subtitle}>
          Campus Placement Dashboard
        </Text>

        {/* Dashboard Cards */}

        <View style={styles.statsContainer}>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {dashboard.totalJobs}
            </Text>
            <Text style={styles.statTitle}>
              Total Jobs
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {dashboard.appliedJobs}
            </Text>
            <Text style={styles.statTitle}>
              Applied
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {dashboard.approvedJobs}
            </Text>
            <Text style={styles.statTitle}>
              Approved
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {dashboard.pendingJobs}
            </Text>
            <Text style={styles.statTitle}>
              Pending
            </Text>
          </View>

        </View>

        {/* Menu */}

        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => router.push("/jobs")}
        >

          <Ionicons
            name="briefcase"
            size={26}
            color="#6366F1"
          />

          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>
              View Jobs
            </Text>
            <Text style={styles.menuSubtitle}>
              Browse all available jobs
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color="#999"
          />

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => router.push("/applications")}
        >

          <Ionicons
            name="document-text"
            size={26}
            color="#10B981"
          />

          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>
              My Applications
            </Text>
            <Text style={styles.menuSubtitle}>
              Track applied jobs
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color="#999"
          />

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => router.push("/profile")}
        >

          <Ionicons
            name="person"
            size={26}
            color="#EF4444"
          />

          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>
              Profile
            </Text>
            <Text style={styles.menuSubtitle}>
              View your profile & resume
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color="#999"
          />

        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    padding: 20,
    paddingTop: Platform.OS === "android" ? 50 : 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  welcome: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: "bold",
    color: "#111",
  },

  subtitle: {
    marginTop: 5,
    color: "#666",
    marginBottom: 25,
  },

  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  statCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    elevation: 3,
  },

  statNumber: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#6366F1",
  },

  statTitle: {
    marginTop: 8,
    color: "#555",
    fontWeight: "600",
  },

  menuCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    elevation: 2,
  },

  menuTextContainer: {
    flex: 1,
    marginLeft: 15,
  },

  menuTitle: {
    fontSize: 17,
    fontWeight: "700",
  },

  menuSubtitle: {
    color: "#777",
    marginTop: 3,
  },

});