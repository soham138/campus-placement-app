import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function HomeScreen() {
  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
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
    <View style={styles.container}>
      
      {/* Left-aligned modern header */}
      <View style={styles.header}>
        <Text style={styles.subtitle}>Welcome back to</Text>
        <Text style={styles.title}>Campus Placement</Text>
      </View>

      {/* Grouped Menu Card */}
      <View style={styles.menuCard}>
        
        <TouchableOpacity 
          style={[styles.menuItem, styles.borderBottom]} 
          activeOpacity={0.6}
          onPress={() => router.push("/jobs")}
        >
          <View style={styles.menuItemLeft}>
            <Text style={styles.icon}>💼</Text>
            <Text style={styles.menuText}>View Jobs</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem} 
          activeOpacity={0.6}
          onPress={() => router.push("/applications")}
        >
          <View style={styles.menuItemLeft}>
            <Text style={styles.icon}>📄</Text>
            <Text style={styles.menuText}>My Applications</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

      </View>

      {/* Red Warning Logout Button */}
      <TouchableOpacity 
        style={styles.logoutButton} 
        activeOpacity={0.7} 
        onPress={logout}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Keeping your requested background theme
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#000",
  },
  menuCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    // Clean shadow
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0", // Subtle divider between options
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 20,
    marginRight: 16,
  },
  menuText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
  },
  chevron: {
    fontSize: 24,
    color: "#ccc",
    fontWeight: "300",
    marginTop: -4,
  },
  logoutButton: {
    backgroundColor: "#ffebee", // Soft red background
    marginTop: 40,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: {
    color: "#d32f2f", // Sharp red text
    fontSize: 16,
    fontWeight: "700",
  },
});