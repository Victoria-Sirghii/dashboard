import Form from "components/LoginPage/Form";
import RegisterForm from "components/RegisterPage/RegisterForm"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register">
          <RegisterForm />
        </Route>
        <Route path="/">
            <Form />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
