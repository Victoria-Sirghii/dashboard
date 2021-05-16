import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { axios } from "api";

type IdParams = {
  id: string;
};

export const SingleUser: React.FC = () => {
  const { id } = useParams<IdParams>();

  const { data, isLoading } = useQuery(["users", id], async () => {
    const { data } = await axios.get(`users/${id}`);
    return data.data;
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  const { email, first_name, last_name, avatar } = data;

  return (
    <div className="content-container">
      <div className="cart d-flex">
        <img src={avatar} alt={last_name} className="avatar" />
        <p className="user-name info">
          {first_name} {last_name}
        </p>
        <p>{email}</p>
      </div>
    </div>
  );
};
