import axios, { InternalAxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";
// import { removeTokens } from "./auth";
// import { store } from "../store/store";
// import { Alert } from "react-native";
// import { logout } from "@/store/authSlice";
// import { router } from "expo-router";

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API,
});

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig<any> {
  skipAuthRefresh?: boolean;
}

apiClient.interceptors.request.use(
  async (config: CustomAxiosRequestConfig) => {
    if (config.skipAuthRefresh) {
      return config;
    }
    const accessToken = await SecureStore.getItemAsync("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
