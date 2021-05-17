import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocalStorage } from "hooks";
import { User } from "types/types";
import { Input } from "../../../components/Input/Input";
import { Label } from "../../../components/Label/Label";
import { Button } from "../../../components/Button/Button";

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
          <Label htmlFor="firstName">First Name</Label>
          <Input
            type="text"
            placeholder="John"
            name="firstName"
            id="firstName"
            value={values?.firstName}
            onChange={handleChange}
          />
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            type="text"
            placeholder="Jackson"
            name="lastName"
            id="lastName"
            value={values?.lastName}
            onChange={handleChange}
          />
          <Label>Gender</Label>
          <div>
            <Input
              type="radio"
              id="male"
              name="gender"
              value="male"
              onChange={handleChange}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <Input
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
          <Label htmlFor="birthday">Birthday</Label>
          <Input
            type="date"
            placeholder=""
            name="birthday"
            id="birthday"
            value={values?.birthday}
            onChange={handleChange}
          />
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="john.jackson@gmail.com"
            name="email"
            id="email"
            value={values?.email}
            onChange={handleChange}
            required
          />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            value={values?.password}
            onChange={handleChange}
            required
          />
          <Label htmlFor="confirmation">Confirm password</Label>
          <Input
            type="password"
            placeholder="Password"
            name="confirmation"
            id="confirmation"
            value={values?.confirmation}
            onChange={handleChange}
            required
          />
          <Button type="submit">Submit</Button>
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
