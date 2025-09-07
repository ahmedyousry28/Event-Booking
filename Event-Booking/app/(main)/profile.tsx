import PrimaryButton from "@/components/ui/Custombutton";
import CustomText from "@/components/ui/CustomText";
import { logoutThunk } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";

const ProfileScreen = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  return (
    <View className="flex-1 px-6 py-12 bg-secondary justify-center">
      <View className="bg-secondary rounded-2xl p-6 shadow-lg">
        <View className="items-center mb-4">
          <View className="w-24 h-24 bg-orange-100 rounded-full items-center justify-center mb-4">
            <Ionicons name="person-circle" size={75} color="#f76c11" />
          </View>
        </View>
        <View className="space-y-4">
          <View className="flex-row items-center p-4 bg-gray-50 rounded-xl">
            <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-3">
              <Ionicons name="person-outline" size={20} color="#f76c11" />
            </View>
            <View className="flex-1">
              <Text className="text-sm text-gray-500 mb-1">Name</Text>
              <Text className="text-lg font-semibold text-gray-800">
                {user.name || "Not provided"}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center p-4 bg-gray-50 rounded-xl">
            <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-3">
              <Ionicons name="mail-outline" size={20} color="#f76c11" />
            </View>
            <View className="flex-1">
              <Text className="text-sm text-gray-500 mb-1">Email</Text>
              <Text className="text-lg font-semibold text-gray-800">
                {user.email || "Not provided"}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center p-4 rounded-xl">
            <PrimaryButton
              onPress={async () => {
                await dispatch(logoutThunk());
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "index" }],
                  })
                );
              }}
            >
              <CustomText className="color-secondary">Logout</CustomText>
            </PrimaryButton>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
