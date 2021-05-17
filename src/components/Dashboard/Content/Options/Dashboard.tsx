import { useFetchQuery } from "hooks";

export const Dashboard: React.FC = () => {
  const [users] = useFetchQuery("users");
  const [post] = useFetchQuery("post");

  return (
    <div className="dashboard-container">
      <div className="box d-flex space-around">
        <p className="title-info">
          Total users: <span className="total">{users.total}</span>
        </p>
        <p className="title-info">
          Total posts: <span className="total">{post.total}</span>
        </p>
      </div>
    </div>
  );
};
