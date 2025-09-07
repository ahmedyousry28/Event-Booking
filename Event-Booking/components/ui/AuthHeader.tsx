import React from "react";
import { Text, View } from "react-native";
import Logo from "./Logo";

interface IProps {
  title: string;
  subtitle?: string;
}
const AuthHeader = ({ title, subtitle }: IProps) => {
  return (
    <View className="my-8">
      <View className=" flex flex-col justify-center items-center w-full">
        <Logo />
        <Text className="w-fit font-Nunitosemi text-5xl text-primary capitalize text-center my-3">
          Evento
        </Text>
      </View>
      <Text className="w-fit font-Nunitosemi text-4xl text-primary-foreground capitalize text-center mb-2">
        {title}
      </Text>
      <Text className="w-fit font-RobotoSlab text-sm text-muted capitalize text-center">
        {subtitle}
      </Text>
    </View>
  );
};

export default AuthHeader;
