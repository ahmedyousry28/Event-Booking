import RegisterForm from "@/components/forms/registerForm";
import AuthHeader from "@/components/ui/AuthHeader";
import PrimaryButton from "@/components/ui/Custombutton";
import CustomText from "@/components/ui/CustomText";
import { handleAuth } from "@/services/auth";
import { useAppDispatch } from "@/store/store";
import { TRegisterForm, userRegisterSchema } from "@/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, router } from "expo-router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { View } from "react-native";
export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterForm>({
    resolver: yupResolver(userRegisterSchema),
  });

  const onSubmit: SubmitHandler<TRegisterForm> = async (inputData) => {
    await handleAuth({
      inputData,
      dispatch,
      router,
      setIsLoading,
      type: "signup",
    });
  };

  return (
    <>
      <AuthHeader
        title="create an account"
        subtitle="please fill this details to create an account"
      />
      <View className="gap-y-5 w-[80%] mx-auto">
        <RegisterForm control={control} errors={errors} />
        <View className="px-4">
          <PrimaryButton
            onPress={handleSubmit(onSubmit)}
            width="w-full"
            loading={isLoading}
          >
            <CustomText className="color-secondary">Sign Up</CustomText>
          </PrimaryButton>
          <CustomText className="color-primary-foreground p-0 normal-case">
            Already have an account?{" "}
            <Link href={"/login"} className="color-primary">
              Log In
            </Link>
          </CustomText>
        </View>
      </View>
    </>
  );
}
