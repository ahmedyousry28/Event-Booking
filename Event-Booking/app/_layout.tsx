import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { getTokens } from "@/config/auth";
import toastConfig from "@/config/toast";
import { setCredentials, setLoggedInStatus } from "@/store/authSlice";
import { store, useAppDispatch } from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import "../global.css";
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();
function NavigationStack() {
  const [dataLoading, setDataLoading] = useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const loadDataFromStorage = async () => {
      try {
        const isLoggedIn = await SecureStore.getItemAsync("isLoggedIn");
        if (isLoggedIn) {
          const { accessToken, user: userData } = (await getTokens())!;
          const user = JSON.parse(userData!);
          dispatch(setCredentials({ accessToken, user }));
          dispatch(setLoggedInStatus(true));
        }
      } finally {
        setDataLoading(false);
      }
    };
    loadDataFromStorage();
  }, [dispatch]);

  if (dataLoading) {
    return <LoadingSpinner />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#ffffff",
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(main)" />
    </Stack>
  );
}
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    RobotoSlab: require("../assets/fonts/RobotoSlab-VariableFont_wght.ttf"),
    RobotoSlabSemi: require("../assets/fonts/RobotoSlab-SemiBold.ttf"),
    Nunito: require("../assets/fonts/Nunito-VariableFont_wght.ttf"),
    Nunitosemi: require("../assets/fonts/Nunito-SemiBold.ttf"),
  });
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#ffffff" }}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#ffffff"} />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <NavigationStack />
        </Provider>
        <Toast config={toastConfig} />
      </QueryClientProvider>
    </SafeAreaView>
  );
}
