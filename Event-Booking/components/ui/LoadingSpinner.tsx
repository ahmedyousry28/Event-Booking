import React from "react";
import { ActivityIndicator, View } from "react-native";

interface IProps {
  size?: "large" | "small" | number;
  color?: string;
}
const LoadingSpinner = ({ size = 50, color = "#F76C11" }: IProps) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default LoadingSpinner;
