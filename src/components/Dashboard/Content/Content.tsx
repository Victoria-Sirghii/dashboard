import { Switch, Route } from "react-router-dom";
import { Dashboard, Users, Posts } from "components";

export const Content: React.FC = () => {
  return (
    <div className="content">
      <Switch>
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
    </div>
  );
};
