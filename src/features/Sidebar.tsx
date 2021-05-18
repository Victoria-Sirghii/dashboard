import { NavLink } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import PostAddIcon from "@material-ui/icons/PostAdd";

export const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h1 className="h1__title">SaaS Kit</h1>
      <div className="user-info d-flex">
        <img
          src="https://pbs.twimg.com/media/D8dDZukXUAAXLdY.jpg"
          alt="random"
          className="user-image"
        />
        <div>
          <p className="user-name">Sierra Ferguson</p>
          <p className="user-email">s.ferguson@gmail.com</p>
        </div>
      </div>
      <nav>
        <ul className="menu">
          <li className="d-flex">
            <DashboardIcon className="menu-icon color-gray" />
            <NavLink
              exact
              to="/dashboard"
              className="link color-black"
              activeClassName="active"
            >
              Dashboard
            </NavLink>
          </li>
          <li className="d-flex">
            <PeopleIcon className="menu-icon color-gray" />
            <NavLink
              to="/dashboard/users"
              className="link color-black"
              activeClassName="active"
            >
              Users
            </NavLink>
          </li>
          <li className="d-flex">
            <PostAddIcon className="menu-icon color-gray" />
            <NavLink
              to="/dashboard/posts"
              className="link color-black"
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
