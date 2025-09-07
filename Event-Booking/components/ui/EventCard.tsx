import { IEvent } from "@/interfaces";
import { formatDate } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EventCard({ item }: { item: IEvent }) {
  const navigation = useNavigation();
  const { availableSpots, price, date, time, location, name, speakers, image } =
    item;
  const today = new Date();
  const eventDate = new Date(date);
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        (navigation as any).navigate("EventDetails", {
          eventId: JSON.stringify(item._id),
        });
      }}
    >
      <Image source={{ uri: image }} className="w-full h-48 rounded-t-xl" />
      <View className="p-4">
        <Text
          className="text-lg font-bold text-gray-800 mb-2"
          numberOfLines={2}
        >
          {name}
        </Text>

        <View className="flex-row items-center mb-2">
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text className="text-sm text-gray-600 ml-1 flex-1">{location}</Text>
        </View>

        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1">
            <View className="flex-row items-center mb-1">
              <Ionicons name="calendar-outline" size={14} color="#f76c11" />
              {today > eventDate ? (
                <Text className="text-xs text-red-500 ml-1 px-2 py-1 rounded-md color-secondary bg-primary">
                  ended
                </Text>
              ) : (
                <Text className="text-xs text-gray-800 ml-1">
                  {formatDate(eventDate.toString())}
                </Text>
              )}
            </View>
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={14} color="#f76c11" />
              <Text className="text-xs text-gray-800 ml-1">{time}</Text>
            </View>
          </View>

          <View className="items-end">
            <Text className="text-lg font-bold" style={{ color: "#f76c11" }}>
              ${price}
            </Text>
            {availableSpots ? (
              <Text className="text-xs text-gray-600 mt-0.5">
                {availableSpots} spots left
              </Text>
            ) : (
              <Text className="text-xs mt-0.5 px-2 py-1 rounded-md color-secondary bg-[#15803d] ">
                Completed
              </Text>
            )}
          </View>
        </View>

        <View className="border-t border-[#d3d3d3] pt-3">
          <Text className="text-xs font-semibold text-gray-800 mb-1">
            Speakers:
          </Text>
          <Text className="text-sm text-gray-600" numberOfLines={1}>
            {speakers.join(", ")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
