import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { axios } from "api";
import { Card } from "ebs-design";
import { Loading } from "features";

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
    return <Loading className="loading-center" />;
  }

  const { email, first_name, last_name, avatar } = data;

  return (
    <div className="content-container">
      <Card className="mn-auto p-20 width-400">
        <div className="d-flex flex-column align-center">
          <img src={avatar} alt={last_name} className="avatar" />
          <p className="user-name info">
            {first_name} {last_name}
          </p>
          <p>{email}</p>
        </div>
      </Card>
    </div>
  );
};
