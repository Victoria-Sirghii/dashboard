import { Switch, Route } from "react-router-dom";
import {
  Dashboard,
  Users,
  Posts,
  NewPostForm,
  EditPost,
  SingleUser,
  SinglePost,
} from "components";

export const DashboardRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path="/dashboard/post/edit/:id">
        <EditPost />
      </Route>
      <Route path="/dashboard/post/create">
        <NewPostForm />
      </Route>
      <Route path="/dashboard/user/:id">
        <SingleUser />
      </Route>
      <Route path="/dashboard/post/:id">
        <SinglePost />
      </Route>
      <Route path="/dashboard/users">
        <Users />
      </Route>
      <Route path="/dashboard/posts">
        <Posts />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </Switch>
  );
};
