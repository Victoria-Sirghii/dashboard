import { Link } from "react-router-dom";
import { useCallback } from "react";
import {
  Button,
  Card,
  Input,
  Container,
  Form,
  DatePicker,
  useForm,
} from "@ebs-integrator/react-ebs-ui";
import { useLocalStorage } from "hooks";
// import { Label } from "components";

interface User {
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  email: string;
  password: string;
  confirmation: string;
}

export const RegisterForm: React.FC = () => {
  const [form] = useForm();
  const [, setStorage] = useLocalStorage();

  const handleSubmit = useCallback(
    (data: any) => {
      setStorage("data", data);
      form.resetFields();
    },
    [form]
  );

  return (
    <div className="container-auth">
      <Container>
        <Card className="mn-auto d-flex flex-column width-400 mt-50 p-20">
          <h2 className="h2__title">Registration Form</h2>
          <Form
            className="form d-flex flex-column"
            onFinish={handleSubmit}
            form={form}
          >
            <Form.Field
              name="firstName"
              label="First Name"
              rules={[{ required: true }]}
            >
              <Input size="large" type="text" placeholder="John" />
            </Form.Field>
            <Form.Field
              name="lastName"
              label="Last Name"
              rules={[{ required: true }]}
            >
              <Input size="large" type="text" placeholder="Jackson" />
            </Form.Field>
            <Form.Field
              name="birthday"
              label="Birthday"
              rules={[{ required: true }]}
            >
              <DatePicker
                dateFormat="dd-MM-yyyy"
                placeholderText="dd-MM-yyyy"
              />
            </Form.Field>
            <Form.Field name="email" label="Email" rules={[{ required: true }]}>
              <Input
                size="large"
                type="email"
                placeholder="john.jackson@gmail.com"
                name="email"
              />
            </Form.Field>
            <Form.Field
              name="Password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input size="large" type="password" placeholder="Password" />
            </Form.Field>
            <Form.Field
              name="confirmation"
              label="Confirm password"
              rules={[{ required: true }]}
            >
              <Input size="large" type="password" placeholder="Password" />
            </Form.Field>
            <Button size="medium" type="primary" className="mtb-20" submit>
              Submit
            </Button>
            <p className="text-center">
              Do you already have an account?
              <Link to="/" className="link link--color-blue">
                {" "}
                Login here
              </Link>
            </p>
          </Form>
        </Card>
      </Container>
    </div>
  );
};
