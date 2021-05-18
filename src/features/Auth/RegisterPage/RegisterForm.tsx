import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocalStorage } from "hooks";
import { Values } from "types/interfaces";
import { Input, Label, Button, Card } from "components";

export const RegisterForm: React.FC = () => {
  const [values, setValues] = useState<Partial<Values>>({});
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
      <Card
        boxShadow="2"
        className="mn-auto d-flex flex-column width-400 mt-50"
      >
        <h2 className="h2__title">Registration Form</h2>
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
            <Label htmlFor="male">Male</Label>
          </div>
          <div>
            <Input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={handleChange}
            />
            <Label htmlFor="female">Female</Label>
          </div>
          <div className="mb-10">
            <Input
              type="radio"
              id="other"
              name="gender"
              value="other"
              onChange={handleChange}
            />
            <Label htmlFor="other">Other</Label>
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
          <Button size="large" type="primary" htmlType="submit">
            Submit
          </Button>
          <p className="text-center">
            Do you already have an account?
            <Link to="/" className="link link--color-blue">
              {" "}
              Login here
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};
