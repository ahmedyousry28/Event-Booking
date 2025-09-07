import CustomErrorToast from "@/components/ui/CustomErrorToast";
import { storeStatus, storeTokens } from "@/config/auth";
import { apiClient } from "@/config/axios.config";
import { setCredentials, setLoggedInStatus } from "@/store/authSlice";
import { TLoginForm, TRegisterForm } from "@/validation";
import { Router } from "expo-router";
import { Dispatch } from "react";
import Toast from "react-native-toast-message";

interface IProps {
  inputData: TLoginForm | TRegisterForm;
  dispatch: Dispatch<any>;
  router: Router;
  setIsLoading: (isLoading: boolean) => void;
  type: "login" | "signup";
}
export const handleAuth = async ({
  inputData,
  dispatch,
  router,
  setIsLoading,
  type,
}: IProps) => {
  try {
    setIsLoading(true);
    if (type === "signup") {
      const dataToSend = {
        name: (inputData as TRegisterForm).name,
        email: inputData.email,
        password: inputData.password,
      };
      inputData = dataToSend;
    }
    const { data } = await apiClient.post(`/auth/${type}`, inputData);
    const { accessToken, data: userData, message } = data;
    await storeTokens(userData, userData.id, accessToken);
    await storeStatus("true");
    dispatch(setCredentials({ accessToken, user: userData }));
    dispatch(setLoggedInStatus(true));
    Toast.show({
      type: "success",
      text1: message,
      position: "bottom",
    });
    router.replace("/");
  } catch (error) {
    CustomErrorToast(error);
  } finally {
    setIsLoading(false);
  }
};
