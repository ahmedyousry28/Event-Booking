import PrimaryButton from "@/components/ui/Custombutton";
import CustomErrorToast from "@/components/ui/CustomErrorToast";
import CustomText from "@/components/ui/CustomText";
import { IEvent } from "@/interfaces";
import {
  CheckEventRegister,
  EventFavourite,
  EventRegister,
} from "@/services/events";
import { formatDate, formatTime } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function SingleEventScreen() {
  console.log("SingleEventScreen");
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const { eventData } = route.params as { eventData: string };
  const event: IEvent = JSON.parse(eventData);
  const {
    availableSpots,
    price,
    date,
    time,
    location,
    name,
    speakers,
    image,
    description,
    capacity,
  } = event;
  const {
    data: registrationData,
    isLoading: isEventLoading,
    refetch: refetchIsEventRegistered,
  } = CheckEventRegister(event._id);

  const favExists = registrationData?.favExists || false;
  const eventExists = registrationData?.eventExists || false;
  const { refetch } = EventRegister(event._id);
  const { refetch: refetchEventFavourite } = EventFavourite(event._id);
  const [available, setAvailable] = useState(availableSpots);
  const today = new Date();
  const eventDate = new Date(date);
  const handleFavourite = async () => {
    try {
      const { data } = await refetchEventFavourite();
      await refetchIsEventRegistered();
      Toast.show({
        type: "success",
        text1: data.message,
      });
    } catch (error) {
      CustomErrorToast(error);
    }
  };
  const handleRegister = async () => {
    try {
      setIsLoading(true);
      const { data } = await refetch();
      await refetchIsEventRegistered();
      queryClient.invalidateQueries({ queryKey: ["events"] });
      Toast.show({
        type: "success",
        text1: data.message,
      });
      if (eventExists) {
        setAvailable((prev) => prev + 1);
      } else {
        setAvailable((prev) => prev - 1);
      }
    } catch (error) {
      console.log(error);
      CustomErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View className="flex-1 bg-secondary relative pt-4">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Image source={{ uri: image }} className="w-full h-64 relative" />
        <Ionicons
          name="heart"
          size={30}
          color={favExists && !isEventLoading ? "#f76c11" : "#fff"}
          onPress={handleFavourite}
          className="absolute top-4 right-4 mr-2"
        />
        <View className="p-6">
          <Text className="text-2xl font-bold text-primary-foreground mb-4">
            {name}
          </Text>
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 bg-orange-100 rounded-full items-center justify-center mr-4">
              <Ionicons name="location" size={20} color="#f76c11" />
            </View>
            <View className="flex-1">
              <Text className="text-sm text-gray-500 mb-1">Location</Text>
              <Text className="text-base text-gray-800 font-medium">
                {location}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 bg-orange-100 rounded-full items-center justify-center mr-4">
              <Ionicons name="calendar" size={20} color="#f76c11" />
            </View>
            <View className="flex-1">
              <Text className="text-sm text-gray-500 mb-1">Date & Time</Text>
              <Text className="text-base text-gray-800 font-medium">
                {formatDate(date.toString())}
              </Text>
              <Text className="text-sm text-gray-600">{formatTime(time)}</Text>
            </View>
          </View>
          <View className="flex-row items-center mb-6">
            <View className="w-12 h-12 bg-orange-100 rounded-full items-center justify-center mr-4">
              <Ionicons name="pricetag" size={20} color="#f76c11" />
            </View>
            <View className="flex-1">
              <Text className="text-sm text-gray-500 mb-1">Price</Text>
              <Text className="text-2xl font-bold text-orange-600">
                ${price}
              </Text>
            </View>
          </View>
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-3">
              About Event
            </Text>
            <Text className="text-base text-gray-600 leading-6">
              {description}
            </Text>
          </View>
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-3">
              Speakers
            </Text>
            {speakers.map((speaker: string, index: number) => (
              <View key={index} className="flex-row items-center mb-3">
                <View className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center mr-3">
                  <Ionicons name="person" size={16} color="#666" />
                </View>
                <Text className="text-base text-gray-700">{speaker}</Text>
              </View>
            ))}
          </View>
          <View className="flex-row justify-between mb-8">
            <View className="flex-1 bg-gray-50 rounded-xl p-4 mr-2">
              <Text className="text-2xl font-bold text-gray-800 mb-1">
                {capacity}
              </Text>
              <Text className="text-sm text-gray-500">Total Capacity</Text>
            </View>
            <View className="flex-1 bg-gray-50 rounded-xl p-4 ml-2">
              <Text className="text-2xl font-bold text-green-600 mb-1">
                {available}
              </Text>
              <Text className="text-sm text-gray-500">Available Spots</Text>
            </View>
          </View>

          {today > eventDate ? (
            <View className=" rounded-xl p-4 bg-[#df7128] mb-4">
              <Text className="text-secondary text-center text-lg px-4 py-1 rounded-md">
                event ended
              </Text>
            </View>
          ) : isEventLoading ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="small" color="#f76c11" />
            </View>
          ) : eventExists ? (
            <PrimaryButton
              onPress={handleRegister}
              width="w-1/2"
              loading={isLoading}
              bgColor="bg-danger"
            >
              <CustomText className="color-secondary p-4">
                cancel registration
              </CustomText>
            </PrimaryButton>
          ) : !availableSpots ? (
            <View className=" rounded-xl bg-[#15803d] p-4 mb-4">
              <Text className="text-secondary text-center text-lg px-4 py-1 ">
                Completed
              </Text>
            </View>
          ) : (
            <PrimaryButton
              onPress={handleRegister}
              width="w-full"
              loading={isLoading}
            >
              <CustomText className="color-secondary">Register Now</CustomText>
            </PrimaryButton>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
