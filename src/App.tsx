import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginForm, RegisterForm } from "components";
import "styles/index.scss";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register">
          <RegisterForm />
        </Route>
        <Route path="/">
          <LoginForm />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
