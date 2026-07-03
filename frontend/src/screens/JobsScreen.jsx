import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  useColorScheme,
} from "react-native";

import * as SecureStore from "expo-secure-store";
import api from "../services/api";
import { lightTheme, darkTheme } from "../constants/theme";

export default function JobsScreen() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applyingJobId, setApplyingJobId] = useState(null);

  const colorScheme = useColorScheme();

  const theme =
    colorScheme === "dark"
      ? darkTheme
      : lightTheme;

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {

    try {

      const response =
        await api.get("/jobs");

      setJobs(response.data);

    } catch (error) {

      Alert.alert(
        "Error",
        "Failed to load jobs"
      );

    } finally {

      setLoading(false);

    }
  };

  const applyJob = async (jobId) => {

    setApplyingJobId(jobId);

    try {

      const userId =
  await SecureStore.getItemAsync(
    "userId"
  );

console.log(
  "Current User ID:",
  userId
);

      if (!userId) {

        Alert.alert(
          "Error",
          "User not logged in"
        );

        return;
      }

      await api.post("/applications/apply", {
  jobId: jobId,
});

      Alert.alert(
        "Success",
        "Applied Successfully"
      );

    } catch (error) {

      if (
        error.response &&
        error.response.status === 409
      ) {

        Alert.alert(
          "Info",
          "You have already applied for this job"
        );

      } else {

        Alert.alert(
          "Error",
          "Application Failed"
        );
      }

    } finally {

      setApplyingJobId(null);

    }
  };

  const renderJob = ({ item }) => (

    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}
    >

      <Text
        style={[
          styles.title,
          { color: theme.text },
        ]}
      >
        {item.title}
      </Text>

      <Text
        style={[
          styles.company,
          { color: theme.text },
        ]}
      >
        {item.company}
      </Text>

      <Text
        style={{
          color: theme.text,
          marginBottom: 8,
        }}
      >
        📍 {item.location}
      </Text>

      <Text
        style={{
          color: theme.text,
          marginBottom: 15,
        }}
      >
        {item.description}
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor:
              applyingJobId === item.id
                ? "#888"
                : theme.button,
          },
        ]}
        disabled={
          applyingJobId === item.id
        }
        onPress={() =>
          applyJob(item.id)
        }
      >
        <Text style={styles.buttonText}>
          {applyingJobId === item.id
            ? "Applying..."
            : "Apply Now"}
        </Text>
      </TouchableOpacity>

    </View>
  );

  if (loading) {

    return (
      <View
        style={[
          styles.loader,
          {
            backgroundColor:
              theme.background,
          },
        ]}
      >
        <ActivityIndicator
          size="large"
        />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme.background,
        },
      ]}
    >
      <FlatList
        data={jobs}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={renderJob}
        contentContainerStyle={{
          padding: 15,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },

  company: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  button: {
    padding: 12,
    borderRadius: 8,
  },

  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },

});