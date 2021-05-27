import { Switch, Route } from "react-router-dom";
import {
  Dashboard,
  Users,
  Posts,
  Tasks,
  NewPostForm,
  EditPost,
  SingleUser,
  SinglePost,
  TaskForm,
  EditTask,
  Profile,
} from "features";

export const DashboardRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path="/dashboard/posts/edit/:id">
        <EditPost />
      </Route>
      <Route path="/dashboard/tasks/edit/:id">
        <EditTask />
      </Route>
      <Route path="/dashboard/posts/create">
        <NewPostForm />
      </Route>
      <Route path="/dashboard/tasks/create">
        <TaskForm />
      </Route>
      <Route path="/dashboard/users/:id">
        <SingleUser />
      </Route>
      <Route path="/dashboard/posts/:id">
        <SinglePost />
      </Route>
      <Route path="/dashboard/profile">
        <Profile />
      </Route>
      <Route path="/dashboard/users">
        <Users />
      </Route>
      <Route path="/dashboard/posts">
        <Posts />
      </Route>
      <Route path="/dashboard/tasks">
        <Tasks />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </Switch>
  );
};
