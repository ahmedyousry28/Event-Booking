import { TBgColorOptions, TBorderColorOptions } from "@/types";
import { ReactNode } from "react";
import { PressableProps, StyleProp, ViewStyle } from "react-native";

export interface ICustomButton extends PressableProps {
  children: string | ReactNode;
  bgColor?: TBgColorOptions | (string & {});
  borderColor?: TBorderColorOptions | (string & {});
  width?: string;
  styled?: StyleProp<ViewStyle>;
  loading?: boolean;
  textLoading?: string;
  textLoadingColor?: string;
}
export interface IRegisterInput {
  name: "name" | "email" | "password" | "confirmPassword";
  placeholder: string;
  type: string;
}
export interface ILoginInput {
  name: "email" | "password";
  placeholder: string;
  type: string;
}

export interface IEvent {
  _id: string;
  name: string;
  date: Date;
  time: string;
  location: string;
  description: string;
  speakers: string[];
  price: number;
  image: string;
  capacity: number;
  availableSpots: number;
}
