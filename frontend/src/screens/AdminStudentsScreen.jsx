import { useEffect, useState } from "react";
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
} from "react-native";

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

  const deleteStudent = (id) => {
    Alert.alert(
      "Delete Student",
      "Are you sure you want to delete this student?",
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
              await api.delete(`/admin/students/${id}`);

              Alert.alert(
                "Success",
                "Student deleted successfully"
              );

              fetchStudents();
            } catch (error) {
              Alert.alert(
                "Error",
                "Unable to delete student"
              );
            }
          },
        },
      ]
    );
  };

  const renderStudent = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {item.name.charAt(0).toUpperCase()}
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>
          {item.name}
        </Text>

        <Text style={styles.email}>
          {item.email}
        </Text>

        <Text style={styles.role}>
          {item.role}
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => {
              setSelectedStudent(item);
              setModalVisible(true);
            }}
          >
            <Text style={styles.buttonText}>
              View
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteStudent(item.id)}
          >
            <Text style={styles.buttonText}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Manage Students
      </Text>

      <TextInput
        placeholder="Search Student..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <FlatList
        data={students.filter(
          (student) =>
            student.name
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            student.email
              .toLowerCase()
              .includes(search.toLowerCase())
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderStudent}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              Student Details
            </Text>

            {selectedStudent && (
              <>
                <Text style={styles.modalText}>
                  ID : {selectedStudent.id}
                </Text>

                <Text style={styles.modalText}>
                  Name : {selectedStudent.name}
                </Text>

                <Text style={styles.modalText}>
                  Email : {selectedStudent.email}
                </Text>

                <Text style={styles.modalText}>
                  Role : {selectedStudent.role}
                </Text>
              </>
            )}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F4F6F8",
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },

  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 4,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  avatarText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  email: {
    marginTop: 5,
    color: "#555",
  },

  role: {
    marginTop: 5,
    color: "#1976D2",
    fontWeight: "bold",
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 15,
  },

  viewButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    flex: 1,
  },

  deleteButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },

  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  modalText: {
    fontSize: 16,
    marginBottom: 12,
  },

  closeButton: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 10,
  },
});

