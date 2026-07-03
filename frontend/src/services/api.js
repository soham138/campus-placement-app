import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { Alert } from "react-native";

const api = axios.create({
  baseURL: "http://192.168.1.11:8081/api",
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(

  (response) => response,

  async (error) => {

    if (
      error.response &&
      (error.response.status === 401 ||
       error.response.status === 403)
    ) {

      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("role");
      await SecureStore.deleteItemAsync("userId");

      Alert.alert(
        "Session Expired",
        "Please login again."
      );

      router.replace("/login");
    }

    return Promise.reject(error);
  }
);

export default api;