import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";

import { router } from "expo-router";

import api from "../services/api";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function AdminJobsScreen() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetchJobs();
}, []);

useFocusEffect(
  useCallback(() => {
    fetchJobs();
  }, [])
);       

  const fetchJobs = async () => {
    try {

      const response = await api.get("/jobs");

      setJobs(response.data);

    } catch (error) {

      Alert.alert("Error", "Failed to load jobs");

    } finally {

      setLoading(false);

    }
  };

  const deleteJob = (id) => {

  Alert.alert(
    "Delete Job",
    "Are you sure you want to delete this job?",
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

            await api.delete(`/jobs/${id}`);

            Alert.alert(
              "Success",
              "Job Deleted"
            );

            fetchJobs();

          } catch {

            Alert.alert(
              "Error",
              "Delete Failed"
            );

          }

        },
      },
    ]
  );

};

  const renderJob = ({ item }) => (

    <View style={styles.card}>

      <Text style={styles.title}>
        {item.title}
      </Text>

      <Text>
        Company : {item.company}
      </Text>

      <Text>
        Location : {item.location}
      </Text>

      <Text>
        {item.description}
      </Text>

      <View style={styles.buttonRow}>

        <TouchableOpacity
  style={styles.editButton}
  onPress={() =>
    router.push({
      pathname: "/(admin)/edit-job",
      params: {
        id: item.id,
      },
    })
  }
>
          <Text style={styles.buttonText}>
            Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
  style={styles.deleteButton}
  onPress={() => deleteJob(item.id)}
>
          <Text style={styles.buttonText}>
            Delete
          </Text>
        </TouchableOpacity>

      </View>

    </View>

  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return (

    <View style={styles.container}>

      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderJob}
      />

      <TouchableOpacity
  style={styles.addButton}
  onPress={() => router.push("/(admin)/add-job")}
>
  <Text style={styles.addText}>
    + Add Job
  </Text>
</TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:15,
    backgroundColor:"#fff"
  },

  loader:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },

  card:{
    backgroundColor:"#f8f8f8",
    padding:15,
    borderRadius:10,
    marginBottom:15,
    elevation:3
  },

  title:{
    fontSize:18,
    fontWeight:"bold",
    marginBottom:8
  },

  buttonRow:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:15
  },

  editButton:{
    backgroundColor:"#2196F3",
    padding:10,
    borderRadius:8,
    width:"45%"
  },

  deleteButton:{
    backgroundColor:"#F44336",
    padding:10,
    borderRadius:8,
    width:"45%"
  },

  buttonText:{
    color:"#fff",
    textAlign:"center",
    fontWeight:"bold"
  },

  addButton:{
    backgroundColor:"#4CAF50",
    padding:15,
    borderRadius:10,
    marginTop:10
  },

  addText:{
    color:"#fff",
    fontWeight:"bold",
    textAlign:"center",
    fontSize:16
  }

});