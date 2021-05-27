import { axios } from "api";
import React, { ReactNode, useEffect, useState } from "react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { User } from "types/interfaces";

interface IProps {
  children: ReactNode;
}

const AppContext = React.createContext<any>({});

const AppProvider = ({ children }: IProps) => {
  const [userId, setUserId] = useState<number>();

  const { data = [], isLoading } = useQuery("users", async () => {
    const { data } = await axios.get(`/users/${userId}`);
    return data;
  });

  useEffect(() => {
    const [id] = JSON.parse(`${localStorage.getItem("userId")}`);
    setUserId(id);
  }, [userId]);

  return <AppContext.Provider value={{ data }}>{children}</AppContext.Provider>;
};

export const useUser = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
