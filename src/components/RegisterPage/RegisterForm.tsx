import { Link } from "react-router-dom";
import { useState } from "react";
import { User } from "utils/types";
import { useLocalStorage } from "hooks";

export const RegisterForm: React.FC = () => {
  const [values, setValues] = useState<Partial<User>>({});
  const [, setStorage] = useLocalStorage();

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setStorage("values", values);
    setValues({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="box d-flex flex-column">
        <h2 className="h2-title">Registration Form</h2>
        <form className="form d-flex flex-column" onSubmit={submitHandler}>
          <label htmlFor="firstName" className="label">
            First Name
          </label>
          <input
            type="text"
            className="form__field"
            placeholder="John"
            name="firstName"
            id="firstName"
            value={values?.firstName}
            onChange={handleChange}
          />
          <label htmlFor="lastName" className="label">
            Last Name
          </label>
          <input
            type="text"
            className="form__field"
            placeholder="Jackson"
            name="lastName"
            id="lastName"
            value={values?.lastName}
            onChange={handleChange}
          />
          <label className="label">Gender</label>
          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              onChange={handleChange}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={handleChange}
            />
            <label htmlFor="female">Female</label>
          </div>
          <div className="mb-10">
            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              onChange={handleChange}
            />
            <label htmlFor="other">Other</label>
          </div>
          <label htmlFor="birthday" className="label">
            Birthday
          </label>
          <input
            type="date"
            className="form__field"
            placeholder=""
            name="birthday"
            id="birthday"
            value={values?.birthday}
            onChange={handleChange}
          />
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            className="form__field"
            placeholder="john.jackson@gmail.com"
            name="email"
            id="email"
            value={values?.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            className="form__field"
            placeholder="Password"
            name="password"
            id="password"
            value={values?.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="confirmation" className="label">
            Confirm password
          </label>
          <input
            type="password"
            className="form__field"
            placeholder="Password"
            name="confirmation"
            id="confirmation"
            value={values?.confirmation}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn">
            Submit
          </button>
          <p className="text-center">
            Do you already have an account?
            <Link to="/" className="link">
              {" "}
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
