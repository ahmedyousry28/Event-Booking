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

// Response interceptor
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     console.log(error);
//     const originalRequest = error.config;
//     // console.log("Response Interceptor Error:", error.response?.status);
//     if (
//       error.response?.status === 402 &&
//       !originalRequest._retry &&
//       originalRequest.url !== "/refreshToken"
//     ) {
//       console.log("Starting refresh token process");
//       try {
//         const refreshToken = await SecureStore.getItemAsync("refreshToken");
//         if (!refreshToken) {
//           throw new Error("No refresh token found");
//         }
//         originalRequest._retry = true;
//         // Add explicit error handling for the refresh request
//         const { data } = await apiClient.post(
//           "/identity/refreshToken",
//           {
//             refreshToken,
//           },
//           {
//             // Prevent this request from being intercepted to avoid infinite loops
//             skipAuthRefresh: true,
//             headers: {
//               "Content-Type": "application/json",
//             },
//           } as CustomAxiosRequestConfig
//         );

//         console.log("Token refresh successful");
//         await SecureStore.setItemAsync("accessToken", data.accessToken);
//         originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
//         return apiClient(originalRequest);
//       } catch (error) {
//         console.log("Token refresh failed");
//         Alert.alert(
//           "Session Expired",
//           "Your session has expired. Please login again.",
//           [
//             {
//               text: "OK",
//               onPress: () => {
//                 store.dispatch(logout());
//                 router.replace("/");
//               },
//             },
//           ]
//         );
//         await removeTokens();
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(error);
//   }
// );
