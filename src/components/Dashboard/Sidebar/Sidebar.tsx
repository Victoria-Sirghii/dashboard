import { NavLink, useLocation } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import PostAddIcon from "@material-ui/icons/PostAdd";

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
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
          <li
            className={
              splitLocation[1] === "dashboard" && splitLocation.length === 2
                ? "d-flex active"
                : "d-flex"
            }
          >
            <DashboardIcon className="icon-color" />
            <NavLink
              to="/dashboard"
              className="option"
              activeClassName="active"
            >
              Dashboard
            </NavLink>
          </li>
          <li
            className={
              splitLocation[2] === "users" ? "d-flex active" : "d-flex"
            }
          >
            <PeopleIcon className="icon-color" />
            <NavLink
              to="/dashboard/users"
              className="option"
              activeClassName="active"
            >
              Users
            </NavLink>
          </li>
          <li
            className={
              splitLocation[2] === "posts" ? "d-flex active" : "d-flex"
            }
          >
            <PostAddIcon className="icon-color" />
            <NavLink
              to="/dashboard/posts"
              className="option"
              activeClassName="active"
            >
              Posts
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
