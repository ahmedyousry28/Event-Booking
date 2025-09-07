import PrimaryButton from "@/components/ui/Custombutton";
import CustomErrorToast from "@/components/ui/CustomErrorToast";
import CustomText from "@/components/ui/CustomText";
import EventDetailsRender from "@/components/ui/EventDetailsRender";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  CheckEventRegister,
  EventFavourite,
  EventRegister,
  GetEventDetails,
} from "@/services/events";
import { useRoute } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function SingleEventScreen() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const { eventId } = route.params as { eventId: string };
  const ID = JSON.parse(eventId);
  const {
    data: eventDetails,
    isLoading: loadingEventDetails,
    error: errorEventDetails,
    refetch: refetchEventDetails,
  } = GetEventDetails(ID);
  const {
    data: registrationData,
    isLoading: isEventLoading,
    refetch: refetchIsEventRegistered,
  } = CheckEventRegister(ID);

  const { refetch } = EventRegister(ID);
  const { refetch: refetchEventFavourite } = EventFavourite(ID);
  const { availableSpots, date } = eventDetails?.event || {};

  const [available, setAvailable] = useState(availableSpots);
  if (loadingEventDetails) {
    return <LoadingSpinner />;
  }
  if (errorEventDetails) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-danger">{"failed to load event details"}</Text>
      </View>
    );
  }

  const favExists = registrationData?.favExists || false;
  const eventExists = registrationData?.eventExists || false;
  const today = new Date();
  const eventDate = new Date(date);
  const handleFavourite = async () => {
    try {
      const { data } = await refetchEventFavourite();
      await refetchIsEventRegistered();
      data.message &&
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
      await refetchEventDetails();
      queryClient.invalidateQueries({ queryKey: ["events"] });

      data.message &&
        Toast.show({
          type: "success",
          text1: data.message,
        });

      if (eventExists) {
        setAvailable((prev: number) => prev + 1);
      } else {
        setAvailable((prev: number) => prev - 1);
      }
    } catch (error) {
      CustomErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View className="flex-1 bg-secondary relative pt-4">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <EventDetailsRender
          item={eventDetails?.event}
          favExists={favExists}
          handleFavourite={handleFavourite}
        />
        <View className="p-6 pt-0">
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
          ) : !availableSpots && available !== 0 ? (
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
