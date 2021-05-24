import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Card } from "@ebs-integrator/react-ebs-ui";
import CSS from "csstype";
import { axios } from "api";
import { Loading } from "features";

type IdParams = {
  id: string;
};

export const SinglePost: React.FC = () => {
  const { id } = useParams<IdParams>();

  const { data, isLoading } = useQuery(["posts", id], async () => {
    const { data } = await axios.get(`posts/${id}`);
    return data;
  });

  if (isLoading) {
    return <Loading className="loading-center" />;
  }
  const { age, bio, birthday, firstName, sex, phone, lastName } = data;

  return (
    <div className="content-container">
      <Card className="mn-auto p-20 width-400">
        <div className="d-flex flex-column align-center">
          <p className="m-10">
            First Name: <span className="ft-weight-500">{firstName}</span>
          </p>
          <p className="m-10">
            Last Name: <span className="ft-weight-500">{lastName}</span>
          </p>
          <p className="m-10">
            Biography: <span className="ft-weight-500">{bio}</span>
          </p>
          <p className="m-10">
            Birthday:<span className="ft-weight-500">{birthday}</span>
          </p>
          <p className="m-10">
            Sex:<span className="ft-weight-500">{sex}</span>
          </p>
          <p className="m-10">
            Phone:<span className="ft-weight-500">{phone}</span>
          </p>
        </div>
      </Card>
    </div>
  );
};
