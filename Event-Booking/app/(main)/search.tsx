import CustomInput from "@/components/ui/CustomInput";
import EventCard from "@/components/ui/EventCard";
import { IEvent } from "@/interfaces";
import { GetAllEvents } from "@/services/events";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";

const SearchScreen = () => {
  const { data: eventsData, isLoading } = GetAllEvents();
  const events: IEvent[] = eventsData?.events || [];
  const [searchText, setSearchText] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (date) {
      setSelectedDate(date);
    }
  };
  const hasActiveFilter = searchText.trim() || selectedDate;

  const filteredEvents = hasActiveFilter
    ? events.filter((event: IEvent) => {
        const eventDate = new Date(event.date);
        const matchesDate = selectedDate
          ? eventDate.toDateString() === selectedDate.toDateString()
          : true;
        const matchesSearch = searchText.trim()
          ? event.name.toLowerCase().includes(searchText.toLowerCase())
          : true;
        return matchesDate && matchesSearch;
      })
    : [];

  return (
    <View className="flex-1 bg-secondary">
      <View className="mt-4 mb-2 w-full px-6">
        <View className="relative">
          <CustomInput
            placeholder="Search events by name"
            value={searchText}
            onChangeText={setSearchText}
            style={{
              height: 48,
              borderColor: "#ccc",
              borderRadius: 12,
              borderWidth: 1,
              paddingHorizontal: 12,
              backgroundColor: "#fff",
            }}
          />

          <Pressable
            onPress={() => setShowDatePicker(true)}
            style={{ position: "absolute", right: 12, top: 12 }}
          >
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={24}
              color="#f76c11"
            />
          </Pressable>
        </View>

        {selectedDate && (
          <View className="flex-row items-center justify-between mt-2 p-2 bg-orange-50 rounded-lg">
            <Text className="text-sm text-gray-600">
              Date filter:{" "}
              {selectedDate.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
              {searchText.trim() && " + " + searchText}
            </Text>
            <Pressable
              onPress={() => {
                setSelectedDate(null);
                setSearchText("");
              }}
              className="p-1"
            >
              <Ionicons name="close-circle" size={20} color="#f76c11" />
            </Pressable>
          </View>
        )}

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#f76c11"
          style={{ marginTop: 40 }}
        />
      ) : (
        <View className="flex-1 px-4">
          {!hasActiveFilter ? (
            <View className="flex-1 justify-center items-center">
              <Ionicons name="search-outline" size={80} color="#ccc" />
              <Text className="text-center text-gray-500 mt-4 text-xl font-semibold">
                Search for Events
              </Text>
              <Text className="text-center text-gray-400 mt-2 px-8">
                Enter a keyword or select a date to find events
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredEvents}
              renderItem={({ item }) => <EventCard item={item} />}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
              ListEmptyComponent={() => (
                <View className="flex-1 justify-center items-center mt-40">
                  <Ionicons name="search-outline" size={64} color="#ccc" />
                  <Text className="text-center text-secondary-foreground mt-4 text-lg">
                    No events found
                  </Text>
                  <Text className="text-center text-secondary-foreground mt-2">
                    Try adjusting your search criteria
                  </Text>
                </View>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default SearchScreen;
