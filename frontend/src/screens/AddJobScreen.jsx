import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";

import { router } from "expo-router";
import api from "../services/api";

export default function AddJobScreen() {

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const saveJob = async () => {

    if (
      !title ||
      !company ||
      !location ||
      !description
    ) {
      Alert.alert("Error", "Fill all fields");
      return;
    }

    try {

      await api.post("/jobs", {
        title,
        company,
        location,
        description,
      });

      Alert.alert("Success", "Job Added");

      router.back();

    } catch (error) {

      Alert.alert("Error", "Unable to add job");

    }

  };

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        Add New Job
      </Text>

      <TextInput
        placeholder="Job Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Company"
        style={styles.input}
        value={company}
        onChangeText={setCompany}
      />

      <TextInput
        placeholder="Location"
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />

      <TextInput
        placeholder="Description"
        style={[styles.input,{height:100}]}
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={saveJob}
      >
        <Text style={styles.buttonText}>
          Save Job
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

  heading:{
    fontSize:24,
    fontWeight:"bold",
    marginBottom:20
  },

  input:{
    borderWidth:1,
    borderColor:"#ccc",
    borderRadius:8,
    padding:12,
    marginBottom:15
  },

  button:{
    backgroundColor:"#4CAF50",
    padding:15,
    borderRadius:10
  },

  buttonText:{
    color:"#fff",
    textAlign:"center",
    fontWeight:"bold",
    fontSize:16
  }

});