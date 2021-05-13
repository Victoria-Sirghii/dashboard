import { Link } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import PostAddIcon from "@material-ui/icons/PostAdd";

export const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h1 className="h1-title">SaaS Kit</h1>
      <div className="user-info d-flex">
        <img
          src="https://pbs.twimg.com/media/D8dDZukXUAAXLdY.jpg"
          alt="random"
          className="user-image"
        />
        <div className="info">
          <p className="user-name">Sierra Ferguson</p>
          <p className="user-email">s.ferguson@gmail.com</p>
        </div>
      </div>
      <nav className="nav">
        <ul className="menu">
          <li className="d-flex">
            <DashboardIcon className="icon-color" />
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="d-flex">
            <PeopleIcon className="icon-color" />
            <Link to="/dashboard/users">Users</Link>
          </li>
          <li className="d-flex">
            <PostAddIcon className="icon-color" />
            <Link to="/dashboard/posts">Posts</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
