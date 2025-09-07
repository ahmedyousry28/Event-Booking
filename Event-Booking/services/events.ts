import useCustomQuery from "@/config/useCustomQuery";

export const GetAllEvents = () => {
  const { data, isLoading, error, refetch } = useCustomQuery({
    queryKey: ["events"],
    url: "/event/all",
  });
  return { data, isLoading, error, refetch };
};
export const GetCompletedEvents = () => {
  const { data, isLoading, error, refetch } = useCustomQuery({
    queryKey: ["events", "completed"],
    url: "/event/completed",
  });
  return { data, isLoading, error, refetch };
};
export const GetClosingSoonEvents = () => {
  const { data, isLoading, error, refetch } = useCustomQuery({
    queryKey: ["events", "closingSoon"],
    url: "/event/closing-soon",
  });
  return { data, isLoading, error, refetch };
};
export const EventRegister = (id: string) => {
  const { data, isLoading, error, refetch } = useCustomQuery({
    queryKey: ["eventRegister"],
    url: `/event/register/${id}`,
    enabled: false,
  });
  return { data, isLoading, error, refetch };
};
export const CheckEventRegister = (id: string) => {
  const { data, isLoading, error, refetch } = useCustomQuery({
    queryKey: ["checkEventRegister"],
    url: `/event/isRegistered/${id}`,
  });
  return { data, isLoading, error, refetch };
};
export const EventFavourite = (id: string) => {
  const { data, isLoading, error, refetch } = useCustomQuery({
    queryKey: ["eventfavourite"],
    url: `/event/favourite/${id}`,
    enabled: false,
  });
  return { data, isLoading, error, refetch };
};
