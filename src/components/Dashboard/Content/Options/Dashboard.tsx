import { axios } from "api";
import { useEffect, useState } from "react";
import {useQueries} from "react-query"
import {useFetchQuery} from "hooks"

export const Dashboard: React.FC = () => {
  const [users, setUsers] = useFetchQuery("users")
  const [post, setPost] = useFetchQuery("post")
  console.log(users)
  console.log(post)
  // const [queries, setQuieries] = useState<{ key: string; }[]>([
  //   {key: "users"},
  //   {key: "unkown"}
  // ])
  
  // const info = useQueries(queries.map((query) => {
  //   return {
  //     queryKey: ['key', query.key],
  //     queryFn: async () => {
  //       const {data} = await axios.get(query.key);
  //       return data.data
  //   }
  // }}
  // ))
 
  return (
  <div className="dashboard-container">
    <div className="box">
      <p>Total users: <span></span></p>
    </div>
  </div>)
};
