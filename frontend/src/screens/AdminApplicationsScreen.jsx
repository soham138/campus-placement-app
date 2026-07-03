import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

import api from "../services/api";

export default function AdminApplicationsScreen() {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {

      const response =
        await api.get("/admin/applications");

      setApplications(response.data);

    } catch (e) {

      Alert.alert(
        "Error",
        "Unable to load applications"
      );

    } finally {

      setLoading(false);

    }
  };

  const updateStatus = async (id, status) => {

    try {

      await api.put(
        `/applications/update-status/${id}?status=${status}`
      );

      loadApplications();

    } catch (e) {

      Alert.alert(
        "Error",
        "Failed to update status"
      );

    }

  };

  const renderItem = ({ item }) => (

    <View style={styles.card}>

      <Text style={styles.name}>
        {item.studentName}
      </Text>

      <Text>
        {item.email}
      </Text>

      <Text>
  User ID : {item.userId}
</Text>

      <Text>
        Job : {item.jobTitle}
      </Text>

      <Text style={styles.status}>
        Status : {item.status}
      </Text>

      <View style={styles.row}>

        <TouchableOpacity
          style={styles.approve}
          onPress={() =>
            updateStatus(
              item.applicationId,
              "APPROVED"
            )
          }
        >
          <Text style={styles.buttonText}>
            Approve
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.reject}
          onPress={() =>
            updateStatus(
              item.applicationId,
              "REJECTED"
            )
          }
        >
          <Text style={styles.buttonText}>
            Reject
          </Text>
        </TouchableOpacity>

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

    <FlatList
      data={applications}
      keyExtractor={(item) =>
        item.applicationId.toString()
      }
      renderItem={renderItem}
      contentContainerStyle={{
        padding:15
      }}
    />

  );

}

const styles = StyleSheet.create({

  loader:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },

  card:{
    backgroundColor:"#fff",
    padding:15,
    marginBottom:15,
    borderRadius:10,
    elevation:3
  },

  name:{
    fontSize:18,
    fontWeight:"bold"
  },

  status:{
    marginTop:8,
    fontWeight:"bold"
  },

  row:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:15
  },

  approve:{
    backgroundColor:"#4CAF50",
    width:"45%",
    padding:10,
    borderRadius:8
  },

  reject:{
    backgroundColor:"#F44336",
    width:"45%",
    padding:10,
    borderRadius:8
  },

  buttonText:{
    color:"#fff",
    textAlign:"center",
    fontWeight:"bold"
  }

});

