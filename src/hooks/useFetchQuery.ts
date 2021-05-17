import { axios } from "api";
import { useQuery } from "react-query";

const useFetchQuery = (key: string) => {
  return useQuery(key, async () => {
    const { data } = await axios.get(key);
    return data;
  });
};
export default useFetchQuery;
