import { axios } from "api";
import React, { ReactNode, useEffect } from "react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { User } from "types/interfaces";
import { Loading } from "features";

interface IProps {
  children: ReactNode;
}

const AppContext = React.createContext<any>({});

const AppProvider = ({ children }: IProps) => {
  const userId = JSON.parse(`${localStorage.getItem("userId")}`);

  const id = React.useMemo(
    () => (Array.isArray(userId) ? userId[0] : null),
    [userId]
  );

  useEffect(() => {
    console.log(id);
  }, [id]);

  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery(
    ["user", id],
    async () => {
      const { data } = await axios.get(`/users/${id}`);
      return data;
    },
    {
      enabled: !!id,
    }
  );

  if (isLoading) {
    return <Loading className="loading-center" />;
  }

  return (
    <AppContext.Provider value={{ data, userId: id, refetch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useUser = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
