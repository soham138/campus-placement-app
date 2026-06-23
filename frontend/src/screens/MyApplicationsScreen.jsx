import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  useColorScheme,
} from "react-native";

import * as SecureStore from "expo-secure-store";
import api from "../services/api";
import {
  lightTheme,
  darkTheme,
} from "../constants/theme";

export default function MyApplicationsScreen() {

  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const colorScheme =
    useColorScheme();

  const theme =
    colorScheme === "dark"
      ? darkTheme
      : lightTheme;

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {

    try {

      const userId =
        await SecureStore.getItemAsync(
          "userId"
        );

      if (!userId) {
        return;
      }

      const response =
        await api.get(
          `/applications/my-applications/${userId}`
        );

      const applicationsData =
        response.data;

      const applicationsWithJobs =
        await Promise.all(

          applicationsData.map(
            async (application) => {

              const jobResponse =
                await api.get(
                  `/jobs/${application.jobId}`
                );

              return {
                ...application,
                job:
                  jobResponse.data,
              };
            }
          )
        );

      setApplications(
        applicationsWithJobs
      );

    } catch (error) {

      Alert.alert(
        "Error",
        "Failed to load applications"
      );

    } finally {

      setLoading(false);

    }
  };

  const renderItem = ({ item }) => (

    <View
      style={[
        styles.card,
        {
          backgroundColor:
            theme.card,
          borderColor:
            theme.border,
        },
      ]}
    >

      <Text
        style={[
          styles.title,
          {
            color:
              theme.text,
          },
        ]}
      >
        {item.job.title}
      </Text>

      <Text
        style={{
          color:
            theme.text,
        }}
      >
        {item.job.company}
      </Text>

      <Text
        style={{
          color:
            theme.text,
          marginTop: 5,
        }}
      >
        📍 {item.job.location}
      </Text>

      <Text
        style={{
          color:
            theme.text,
          marginTop: 10,
        }}
      >
        Status:
        {" "}
        {item.status}
      </Text>

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
        data={applications}
        renderItem={renderItem}
        keyExtractor={(item) =>
          item.id.toString()
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 15,
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

});