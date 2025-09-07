import LoginForm from "@/components/forms/loginForm";
import AuthHeader from "@/components/ui/AuthHeader";
import PrimaryButton from "@/components/ui/Custombutton";
import CustomText from "@/components/ui/CustomText";
import { handleAuth } from "@/services/auth";
import { useAppDispatch } from "@/store/store";
import { TLoginForm, userLoginSchema } from "@/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, router } from "expo-router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { View } from "react-native";
export default function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>({
    resolver: yupResolver(userLoginSchema),
  });

  const onSubmit: SubmitHandler<TLoginForm> = async (inputData) => {
    await handleAuth({
      inputData,
      dispatch,
      router,
      setIsLoading,
      type: "login",
    });
  };

  return (
    <>
      <AuthHeader
        title="welcome back!"
        subtitle="use your credentials to access your account"
      />
      <View className="gap-y-5 w-[80%] mx-auto">
        <LoginForm control={control} errors={errors} />
        <View className="px-4">
          <PrimaryButton
            onPress={handleSubmit(onSubmit)}
            width="w-full"
            loading={isLoading}
          >
            <CustomText className="color-secondary">log in</CustomText>
          </PrimaryButton>
          <CustomText className="color-primary-foreground p-0 normal-case">
            Don&apos;t have an account?{" "}
            <Link href={"/register"} className="color-primary">
              Sign Up
            </Link>
          </CustomText>
        </View>
      </View>
    </>
  );
}
