import EventCard from "@/components/ui/EventCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { IEvent } from "@/interfaces";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { FlatList, Text, View } from "react-native";

interface IProps {
  eventQueryData: () => {
    data: {
      events: IEvent[];
    };
    isLoading: boolean;
    error: any;
    refetch: () => void;
  };
  source?: "user" | "favourite";
}
export default function AllEventsScreen({ eventQueryData, source }: IProps) {
  const { data, isLoading, error, refetch } = eventQueryData();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-danger">{error.message}</Text>
      </View>
    );
  }
  if (data.events.length === 0) {
    if (source === "user") {
      return (
        <View className="flex-1 justify-center items-center">
          <Text className="text-primary">
            there are no events registered for you
          </Text>
        </View>
      );
    } else if (source === "favourite") {
      return (
        <View className="flex-1 justify-center items-center">
          <Text className="text-primary">
            there are no favourite events for you
          </Text>
        </View>
      );
    }
  }
  return (
    <View className="flex-1 bg-gray-100">
      <FlatList
        data={data.events}
        renderItem={({ item }) => <EventCard item={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        className="p-4"
      />
    </View>
  );
}
