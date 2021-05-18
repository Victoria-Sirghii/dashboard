import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "hooks";
import { Login } from "types/interfaces";
import { Input, Button, Card } from "components";

export const LoginForm: React.FC = () => {
  const [values, setValues] = useState<Partial<Login>>({});
  const [, setStorage] = useLocalStorage();

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setStorage("user", values);
    setValues({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <Card
        boxShadow="2"
        className="mn-auto d-flex flex-column width-400 mt-50"
      >
        <h2 className="h2__title">Login Form</h2>
        <form className="form d-flex flex-column" onSubmit={submitHandler}>
          <Input
            size="medium"
            type="email"
            placeholder="E-mail"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            required
          />
          <Input
            size="medium"
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            required
          />
          <a href="/" className="link link--color-blue text-center">
            Forgot Password?
          </a>
          <Button size="large" type="primary" htmlType="submit">
            Login
          </Button>
          <p className="text-center">
            Not a member?
            <Link to="/register" className="link link--color-blue">
              {" "}
              Register now
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};
