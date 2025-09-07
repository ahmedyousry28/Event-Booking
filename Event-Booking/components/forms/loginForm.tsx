import { LOGIN_FORM } from "@/data";
import { TLoginForm } from "@/validation";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { View } from "react-native";
import CustomInput from "../ui/CustomInput";
import CustomMsgError from "../ui/CustomMsgError";

const LoginForm = ({
  control,
  errors,
}: {
  control: Control<TLoginForm>;
  errors: FieldErrors<TLoginForm>;
}) => {
  const renderRegisterForm = LOGIN_FORM.map(
    ({ name, placeholder, type }, idx) => (
      <View key={idx}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={type === "password"}
            />
          )}
          name={name}
        />
        {errors[name] && <CustomMsgError msg={errors[name].message} />}
      </View>
    )
  );
  return renderRegisterForm;
};

export default LoginForm;
