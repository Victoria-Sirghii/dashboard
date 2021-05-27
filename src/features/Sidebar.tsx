import { NavLink } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import PostAddIcon from "@material-ui/icons/PostAdd";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import { User } from "types/interfaces";
import { useUser } from "context";

export const Sidebar: React.FC = () => {
  const { data }: any = useUser();

  return (
    <div>
      <h1 className="h1__title">SaaS Kit</h1>
      <div className="user-info d-flex">
        <img src={data?.avatar} alt="random" className="user-image" />
        <div>
          <p className="user-name">
            {data.firstName} {data.lastName}
          </p>
          <p className="user-email">{data.email}</p>
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
          <li className="d-flex">
            <FormatListBulletedIcon className="menu-icon color-gray" />
            <NavLink
              to="/dashboard/tasks"
              className="link color-black"
              activeClassName="active"
            >
              Tasks
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
