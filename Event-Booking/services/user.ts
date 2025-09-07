import useCustomQuery from "@/config/useCustomQuery";

export const GetUserEvents = () => {
  const { data, isLoading, error, refetch } = useCustomQuery({
    queryKey: ["events", "user"],
    url: "/user/events",
  });
  return { data, isLoading, error, refetch };
};
export const GetUserFavourites = () => {
  const { data, isLoading, error, refetch } = useCustomQuery({
    queryKey: ["events", "favourites"],
    url: "/user/favourites",
  });
  return { data, isLoading, error, refetch };
};
