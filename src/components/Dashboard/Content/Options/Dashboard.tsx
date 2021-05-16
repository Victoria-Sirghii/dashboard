import {useFetchQuery} from "hooks";
import { useEffect } from "react";

export const Dashboard: React.FC = () => {
  const [users, setUsers] = useFetchQuery()
  
  useEffect(() => {
    setUsers("users")
  }, [])
  // const {data = [], isLoading} = useQuery(["users"], async () => {
  //   const {data} = await axios.get("users");
  //   return data
  // })
  
  // if (isLoading) {
  //   return <h1>Loading...</h1>;
  // }
  return (
  <div className="dashboard-container">
    <div className="box">
      <p>Total users: <span></span></p>
    </div>
  </div>)
};
