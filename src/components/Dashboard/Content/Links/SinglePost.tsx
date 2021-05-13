import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
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
    <div className="user-container">
      <div className="cart d-flex">
        <div className="circle-color" style={backgroundColor}></div>
        <p>
          <span className="bold">{name}:</span> {color}
        </p>
        <p>
          <span className="bold">Year:</span> {year}
        </p>
      </div>
    </div>
  );
};
