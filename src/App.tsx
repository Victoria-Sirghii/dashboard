import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { LoginForm, RegisterForm, DashboardContent } from "features";
import "styles/index.scss";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
