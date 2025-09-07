import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Pressable, Text, View } from "react-native";

export function LayoutHeader({
  title = "Evento",
  icon = "arrow-back",
}: {
  title?: string;
  icon?: "menu" | "arrow-back";
}) {
  const navigation = useNavigation();

  const pressHandler = () => {
    if (icon === "arrow-back") {
      navigation.goBack();
    } else {
      // @ts-ignore
      navigation.openDrawer();
    }
  };

  return (
    <View className="flex flex-row items-center bg-secondary ">
      <Pressable
        onPress={pressHandler}
        style={{
          backgroundColor: "#ffffff",
          position: "relative",
          zIndex: 1000,
          padding: 10,
          paddingLeft: 20,
        }}
      >
        <Ionicons name={icon} size={35} color="#f76c11" />
      </Pressable>
      <Text
        className={`font-Nunitosemi ${title === "Evento" ? "text-5xl" : "text-3xl"} text-primary capitalize text-center absolute left-1/2 -translate-x-1/2`}
      >
        {title}
      </Text>
    </View>
  );
}
