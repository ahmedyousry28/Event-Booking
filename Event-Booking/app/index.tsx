import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useAppSelector } from "@/store/store";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    if (isLoggedIn) {
      router.dismissTo("/(main)");
    } else {
      router.dismissTo("/(auth)/login");
    }
  }, [isLoggedIn, isReady, router]);

  return <LoadingSpinner />;
};
export default Page;
