import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

import { useLocalSearchParams, router } from "expo-router";
import api from "../services/api";

export default function EditJobScreen() {

  const { id } = useLocalSearchParams();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
  try {

    console.log("Loading Job ID:", id);

    const response = await api.get(`/jobs/${id}`);

    console.log("Response:", response.data);

    setTitle(response.data.title);
    setCompany(response.data.company);
    setLocation(response.data.location);
    setDescription(response.data.description);

  } catch (error) {

    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
    console.log("MESSAGE:", error.message);

    Alert.alert("Error", "Unable to load job");

  }
};

  const updateJob = async () => {

    try {

      await api.put(`/jobs/${id}`, {
        title,
        company,
        location,
        description,
      });

      Alert.alert("Success", "Job Updated");

      router.back();

    } catch {

      Alert.alert("Error", "Update Failed");

    }

  };

  return (

    <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="Job Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Company"
        value={company}
        onChangeText={setCompany}
      />

      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <TextInput
        style={[styles.input,{height:100}]}
        multiline
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={updateJob}
      >
        <Text style={styles.buttonText}>
          Update Job
        </Text>
      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:20,
    backgroundColor:"#fff"
  },

  input:{
    borderWidth:1,
    borderColor:"#ddd",
    borderRadius:8,
    padding:12,
    marginBottom:15
  },

  button:{
    backgroundColor:"#2196F3",
    padding:15,
    borderRadius:8
  },

  buttonText:{
    color:"#fff",
    textAlign:"center",
    fontWeight:"bold"
  }

});