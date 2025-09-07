import { REGISTER_FORM } from "@/data";
import { TRegisterForm } from "@/validation";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { View } from "react-native";
import CustomInput from "../ui/CustomInput";
import CustomMsgError from "../ui/CustomMsgError";

const RegisterForm = ({
  control,
  errors,
}: {
  control: Control<TRegisterForm>;
  errors: FieldErrors<TRegisterForm>;
}) => {
  const renderRegisterForm = REGISTER_FORM.map(
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

export default RegisterForm;
