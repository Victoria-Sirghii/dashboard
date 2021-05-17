import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "hooks";
import { Login } from "types/types";
import { Input } from "../../../components/Input/Input";

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
      <div className="box d-flex flex-column">
        <h2 className="h2-title">Login Form</h2>
        <form className="form d-flex flex-column" onSubmit={submitHandler}>
          <Input
            type="email"
            placeholder="E-mail"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            required
          />
          <a href="/" className="link text-center">
            Forgot Password?
          </a>
          <button className="btn">Login</button>
          <p className="text-center">
            Not a member?
            <Link to="/register" className="link">
              {" "}
              Register now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
