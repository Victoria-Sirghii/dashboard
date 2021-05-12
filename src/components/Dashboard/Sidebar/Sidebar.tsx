import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Dashboard, Users, Posts } from "components";
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
      <Router>
        <nav className="menu">
          <ul>
            <li>
              <DashboardIcon />
              <Link to="/dashContent">Dashboard</Link>
            </li>
            <li>
              <PeopleIcon />
              <Link to="/users">Users</Link>
            </li>
            <li>
              <PostAddIcon />
              <Link to="/posts">Posts</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/dashContent">
            <Dashboard />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/posts">
            <Posts />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
