import { axios } from "api";
import { useState } from "react";
import { useQuery } from "react-query";


const useFetchQuery = (key: string) => {
  const [dataFetch, setDataFetch] = useState()
  const {data = [], isLoading} = useQuery(["data", key], async () => {
    const {data} = await axios.get(key);
    setDataFetch(data)
    return data
  })
  return [dataFetch]
}
export default useFetchQuery;

