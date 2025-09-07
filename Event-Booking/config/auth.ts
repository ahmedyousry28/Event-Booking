import * as SecureStore from "expo-secure-store";
// Store tokens
export const storeTokens = async (
  user: string,
  userId: string,
  accessToken: string
) => {
  try {
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("userId", JSON.stringify(userId));
    await SecureStore.setItemAsync("user", JSON.stringify(user));
    console.log("Tokens stored successfully!");
  } catch (error) {
    console.error("SecureStore Error:", error);
  }
};
export const storeStatus = async (status: "true" | "false") => {
  try {
    await SecureStore.setItemAsync("isLoggedIn", status);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Retrieve tokens
export const getTokens = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    const userId = await SecureStore.getItemAsync("userId");
    const user = await SecureStore.getItemAsync("user");
    const status = await SecureStore.getItemAsync("isLoggedIn");
    return {
      accessToken,
      user,
      userId,
      status,
    };
  } catch (error) {
    console.error("SecureStore Error:", error);
    return null;
  }
};

// Remove tokens
export const removeTokens = async () => {
  try {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("userId");
    await SecureStore.deleteItemAsync("user");
    await SecureStore.deleteItemAsync("isLoggedIn");
    console.log("Tokens removed successfully!");
  } catch (error) {
    console.error("SecureStore Error:", error);
  }
};
