import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginForm, RegisterForm, DashboardContent, Profile } from "features";
import "styles/index.scss";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          <DashboardContent />
        </Route>
        <Route path="/register">
          <RegisterForm />
        </Route>
        <Route exact path="/">
          <LoginForm />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
