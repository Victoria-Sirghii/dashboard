import { useFetchQuery } from "hooks";
import { LineChartPost, AreaChartPost, BarChartPost, Loading } from "features";
import { Card } from "@ebs-integrator/react-ebs-ui";
import { useState } from "react";

export const Dashboard: React.FC = () => {
  const { data: users } = useFetchQuery("users");
  const { data: post, isLoading } = useFetchQuery("post");

  return (
    <div className="dashboard-container grid-charts">
      <Card className="d-flex total-chart fit-content">
        <h2 className="h2__title ft-weight-500 d-flex flex-column">
          Total users: <span className="total-users">{users?.total}</span>
        </h2>
        <h2 className="h2__title ft-weight-500 d-flex flex-column">
          Total posts: <span className="total-posts">{post?.total}</span>
        </h2>
      </Card>
      {isLoading ? (
        <Loading />
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
