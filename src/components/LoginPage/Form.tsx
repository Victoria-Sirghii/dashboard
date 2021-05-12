import { useState } from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "hooks/useLocalStorage";
import { Login } from "utils/types";
import "styles/styles.scss";

const defaultValues = {
  email: "",
  password: "",
};

const Form: React.FC = () => {
  const [values, setValues] = useState<Login>(defaultValues);
  const [storage, setStorage] = useLocalStorage();

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setStorage("user", values);
    setValues(defaultValues);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="box flex">
        <h2 className="title">Login Form</h2>
        <form className="form__group field flex" onSubmit={submitHandler}>
          <input
            type="email"
            className="form__field"
            placeholder="E-mail"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            className="form__field"
            placeholder="Password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            required
          />
          <a href="" className="link center">
            Forgot Password?
          </a>
          <button className="btn">Login</button>
          <p className="center">
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

export default Form;
