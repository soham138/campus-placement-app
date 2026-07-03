import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  SafeAreaView, 
  Platform,
  ScrollView
} from "react-native";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {

  const logout = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out of your account?",
      [
        { text: "Cancel", style: "cancel" },
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* HERO SECTION */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.profileIcon} onPress={() => router.push("/profile")}>
            <Ionicons name="person-circle" size={44} color="#1E293B" />
          </TouchableOpacity>
          <TouchableOpacity onPress={logout} style={styles.logoutIcon}>
            <Ionicons name="log-out-outline" size={28} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>Hello, Future Leader!</Text>
          <Text style={styles.title}>Kickstart your career journey today.</Text>
        </View>

        {/* BENTO GRID MENU */}
        <View style={styles.grid}>
          
          {/* Main Action Card - Full Width */}
          <TouchableOpacity 
            style={[styles.card, styles.primaryCard]} 
            activeOpacity={0.8}
            onPress={() => router.push("/jobs")}
          >
            <View style={styles.cardHeader}>
              <View style={styles.iconWrapperLight}>
                <Ionicons name="briefcase" size={24} color="#6366F1" />
              </View>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.primaryCardTitle}>Explore New Jobs</Text>
            <Text style={styles.primaryCardSub}>Find and apply for the latest campus placement drives.</Text>
          </TouchableOpacity>

          {/* Secondary Actions - Split Row */}
          <View style={styles.row}>
            
            {/* Applications Card */}
            <TouchableOpacity 
              style={[styles.card, styles.halfCard]} 
              activeOpacity={0.8}
              onPress={() => router.push("/applications")}
            >
              <View style={[styles.iconWrapperDark, { backgroundColor: '#ECFDF5' }]}>
                <Ionicons name="document-text" size={22} color="#10B981" />
              </View>
              <Text style={styles.cardTitle}>Applications</Text>
              <Text style={styles.cardSub}>Track status</Text>
            </TouchableOpacity>

            {/* Profile Card */}
            <TouchableOpacity 
              style={[styles.card, styles.halfCard]} 
              activeOpacity={0.8}
              onPress={() => router.push("/profile")}
            >
              <View style={[styles.iconWrapperDark, { backgroundColor: '#FEF2F2' }]}>
                <Ionicons name="settings" size={22} color="#EF4444" />
              </View>
              <Text style={styles.cardTitle}>My Profile</Text>
              <Text style={styles.cardSub}>Update resume</Text>
            </TouchableOpacity>

          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Cool slate off-white
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 40 : 10,
    paddingBottom: 40,
  },
  
  // Header / Top Bar
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  profileIcon: {
    marginLeft: -4, // visually align with edge
  },
  logoutIcon: {
    padding: 8,
  },

  // Welcome Text Area
  welcomeSection: {
    marginBottom: 32,
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

  // Grid Layout
  grid: {
    display: "flex",
    gap: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16, // Requires React Native 0.71+ (use margin on children if older)
  },

  // Base Card Styles
  card: {
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },

  // Primary Card (Jobs)
  primaryCard: {
    backgroundColor: "#6366F1", // Indigo
    minHeight: 180,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  iconWrapperLight: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  primaryCardTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  primaryCardSub: {
    fontSize: 14,
    color: "#E0E7FF",
    fontWeight: "500",
    lineHeight: 20,
  },

  // Half Cards (Applications & Profile)
  halfCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    minHeight: 160,
    justifyContent: "space-between",
  },
  iconWrapperDark: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 13,
    color: "#94A3B8",
    fontWeight: "500",
  },
});