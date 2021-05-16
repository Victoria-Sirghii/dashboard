import { axios } from "api";
import { useState } from "react";
import { useQuery } from "react-query";


const useFetchQuery = (key: string): [any, (key: string) => void] => {
  const [dataFetch, setDataFetch] = useState()
  const {data = [], isLoading} = useQuery(key, async () => {
    const {data} = await axios.get("users");
    setDataFetch(data)
    console.log(dataFetch)
  })
  return {dataFetch}
}

export default useFetchQuery;
