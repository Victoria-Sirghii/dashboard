import { axios } from "api";
import React, { ReactNode } from "react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { Loading } from "features";
import { User } from "types/interfaces";

interface IProps {
  children: ReactNode;
}

interface Context {
  data: User;
  userId: number | null;
  refetch: () => void;
}

const AppContext = React.createContext<Context>({
  data: {},
  userId: null,
  refetch: () => null,
});

const AppProvider = ({ children }: IProps) => {
  const userId = JSON.parse(`${localStorage.getItem("userId")}`);

  const id = React.useMemo(
    () => (Array.isArray(userId) ? userId[0] : null),
    [userId]
  );

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
