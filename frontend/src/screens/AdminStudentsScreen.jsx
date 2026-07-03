import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import api from "../services/api";

export default function AdminStudentsScreen() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get("/admin/students");
      setStudents(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const openResume = async (resume) => {
    if (!resume) {
      Alert.alert("Notice", "This student hasn't uploaded a resume yet.");
      return;
    }
    const url = `http://192.168.1.11:8081/api/users/resume/${resume}`;
    await Linking.openURL(url);
  };

  const deleteStudent = (id) => {
    Alert.alert(
      "Remove Student",
      "Are you sure you want to delete this student's account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/admin/students/${id}`);
              Alert.alert("Success", "Student removed successfully");
              fetchStudents();
            } catch (error) {
              Alert.alert("Error", "Unable to delete student");
            }
          },
        },
      ]
    );
  };

  const renderStudent = ({ item }) => (
    <View style={styles.card}>
      {/* Top Row: Avatar & Info */}
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.name ? item.name.charAt(0).toUpperCase() : "U"}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.email} numberOfLines={1}>{item.email}</Text>
        </View>

        <View style={styles.rolePill}>
          <Text style={styles.roleText}>{item.role || "STUDENT"}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Bottom Row: Actions */}
      <View style={styles.actionsRow}>
        
        {/* View Details Button */}
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: "#EEF2FF" }]}
          onPress={() => {
            setSelectedStudent(item);
            setModalVisible(true);
          }}
        >
          <Ionicons name="eye" size={18} color="#6366F1" />
          <Text style={[styles.actionText, { color: "#6366F1" }]}>View</Text>
        </TouchableOpacity>

        {/* Resume Button */}
        <TouchableOpacity
          style={[
            styles.actionBtn, 
            { backgroundColor: item.resume ? "#ECFDF5" : "#F1F5F9" }
          ]}
          onPress={() => openResume(item.resume)}
        >
          <Ionicons 
            name={item.resume ? "document-text" : "document-outline"} 
            size={18} 
            color={item.resume ? "#10B981" : "#94A3B8"} 
          />
          <Text style={[styles.actionText, { color: item.resume ? "#10B981" : "#94A3B8" }]}>
            Resume
          </Text>
        </TouchableOpacity>

        {/* Spacer to push delete button to the right */}
        <View style={{ flex: 1 }} />

        {/* Delete Button */}
        <TouchableOpacity
          style={[styles.iconBtn, { backgroundColor: "#FEF2F2" }]}
          onPress={() => deleteStudent(item.id)}
        >
          <Ionicons name="trash" size={18} color="#EF4444" />
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

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Fixed Header & Search */}
      <View style={styles.headerContainer}>
        <Text style={styles.greeting}>Admin Portal</Text>
        <Text style={styles.title}>Student Directory</Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
          <TextInput
            placeholder="Search by name or email..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            autoCorrect={false}
          />
        </View>
      </View>

      {/* Student List */}
      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderStudent}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={48} color="#CBD5E1" />
            <Text style={styles.emptyText}>No students found</Text>
          </View>
        }
      />

      {/* Elegant Details Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            
            <View style={styles.modalHeader}>
              <View style={styles.modalIconWrapper}>
                <Ionicons name="person" size={24} color="#6366F1" />
              </View>
              <Text style={styles.modalTitle}>Student Profile</Text>
            </View>

            {selectedStudent && (
              <View style={styles.modalBody}>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Student ID</Text>
                  <Text style={styles.modalValue}>#{selectedStudent.id}</Text>
                </View>
                <View style={styles.modalDivider} />
                
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Full Name</Text>
                  <Text style={styles.modalValue}>{selectedStudent.name}</Text>
                </View>
                <View style={styles.modalDivider} />
                
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Email Address</Text>
                  <Text style={styles.modalValue}>{selectedStudent.email}</Text>
                </View>
                <View style={styles.modalDivider} />
                
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>System Role</Text>
                  <Text style={styles.modalValue}>{selectedStudent.role}</Text>
                </View>
              </View>
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
    backgroundColor: "#F8FAFC",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  
  // Header & Search
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 40 : 10,
    paddingBottom: 10,
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
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 54,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1E293B",
    fontWeight: "500",
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

  // Bento Card
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
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#6366F1", // Indigo
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },
  infoContainer: {
    flex: 1,
    paddingRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
  },
  rolePill: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
    textTransform: "uppercase",
  },
  
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 16,
  },

  // Actions Row
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10, // Requires RN 0.71+. If older, use marginRight on buttons
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 6,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
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
    marginBottom: 24,
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalLabel: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
  },
  modalValue: {
    fontSize: 15,
    color: "#1E293B",
    fontWeight: "700",
  },
  modalDivider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 12,
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