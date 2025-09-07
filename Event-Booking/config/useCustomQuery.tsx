import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { apiClient } from "./axios.config";

interface IAuthenticatedQuery {
  queryKey: string[];
  url: string;
  config?: AxiosRequestConfig;
  enabled?: boolean;
}
const useCustomQuery = ({
  queryKey,
  url,
  config,
  enabled = true,
}: IAuthenticatedQuery) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await apiClient.get(url, config);
      return data;
    },
    enabled: enabled,
  });
};

export default useCustomQuery;
