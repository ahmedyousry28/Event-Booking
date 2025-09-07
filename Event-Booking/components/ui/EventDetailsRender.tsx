import { IEvent } from "@/interfaces";
import { formatDate, formatTime } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

const EventDetailsRender = ({
  item,
  favExists,
  handleFavourite,
}: {
  item: IEvent;
  favExists: boolean;
  handleFavourite: () => void;
}) => {
  const {
    image,
    name,
    location,
    date,
    time,
    price,
    description,
    speakers,
    capacity,
    availableSpots,
  } = item;

  return (
    <>
      <Image source={{ uri: image }} className="w-full h-64 relative" />
      <Ionicons
        name="heart"
        size={30}
        color={favExists ? "#f76c11" : "#fff"}
        onPress={handleFavourite}
        className="absolute top-4 right-4 mr-2"
      />
      <View className="p-6 pb-0">
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
            <Text className="text-2xl font-bold text-orange-600">${price}</Text>
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
          <Text className="text-lg font-bold text-gray-800 mb-3">Speakers</Text>
          {speakers?.map((speaker: string, index: number) => (
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
              {availableSpots}
            </Text>
            <Text className="text-sm text-gray-500">Available Spots</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default EventDetailsRender;
