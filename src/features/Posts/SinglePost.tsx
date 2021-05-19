import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Card } from "@ebs-integrator/react-ebs-ui";
import CSS from "csstype";
import { axios } from "api";

type IdParams = {
  id: string;
};

export const SinglePost: React.FC = () => {
  const { id } = useParams<IdParams>();

  const { data, isLoading } = useQuery(["posts", id], async () => {
    const { data } = await axios.get(`unknown/${id}`);
    return data.data;
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  const { name, year, color } = data;

  const backgroundColor: CSS.Properties = {
    backgroundColor: `${color}`,
  };

  return (
    <div className="content-container">
      <Card className="mn-auto p-20 width-400">
        <div className="d-flex flex-column align-items-center">
          <div className="circle-color" style={backgroundColor}></div>
          <p>
            <span className="font-weight-500">{name}:</span> {color}
          </p>
          <p>
            <span className="font-weight-500">Year:</span> {year}
          </p>
        </div>
      </Card>
    </div>
  );
};
