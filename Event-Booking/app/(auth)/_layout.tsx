import { Slot } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

export default function AuthLayout() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 30 }}
      >
        <View>
          <Slot />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
