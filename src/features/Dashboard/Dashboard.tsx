import { useFetchQuery } from "hooks";
import { LineChartPost, AreaChartPost, BarChartPost } from "features";

export const Dashboard: React.FC = () => {
  const { data: users } = useFetchQuery("users");
  const { data: post, isLoading } = useFetchQuery("post");

  return (
    <div className="dashboard-container grid-charts">
      <div className="box d-flex space-around totalChart">
        <p className="title-info">
          Total users: <span className="total">{users?.total}</span>
        </p>
        <p className="title-info">
          Total posts: <span className="total">{post?.total}</span>
        </p>
      </div>
      {isLoading ? (
        "is loading"
      ) : (
        <>
          <AreaChartPost post={post} />
          <LineChartPost post={post} />
          <BarChartPost post={post} />
        </>
      )}
    </div>
  );
};
