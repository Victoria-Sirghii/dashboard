import { axios } from "api";
import { useQuery } from "react-query";

const useFetchQuery = (key: string) => {
  const { data = [] } = useQuery(["data", key], async () => {
    const { data } = await axios.get(key);
    return data;
  });
  return [data];
};
export default useFetchQuery;
