import { Link } from "react-router-dom";
import { useCallback } from "react";
import {
  Button,
  Card,
  Input,
  Container,
  Form,
  useForm,
} from "@ebs-integrator/react-ebs-ui";
import { useLocalStorage } from "hooks";

export interface User {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const [form] = useForm();
  const [, setStorage] = useLocalStorage();

  const handleSubmit = useCallback(
    (data: any) => {
      setStorage("user", data);
      form.resetFields();
    },
    [form, setStorage]
  );

  return (
    <div className="container-auth">
      <Container>
        <Card className="mn-auto d-flex flex-column width-400 mt-50 p-20">
          <h2 className="h2__title">Login Form</h2>
          <Form
            className="form d-flex flex-column"
            onFinish={handleSubmit}
            form={form}
          >
            <Form.Field name="email" rules={[{ required: true }]}>
              <Input
                size="large"
                type="email"
                className="mtb-10"
                placeholder="E-mail"
              />
            </Form.Field>
            <Form.Field name="password" rules={[{ required: true }]}>
              <Input size="large" type="password" placeholder="Password" />
            </Form.Field>
            <a href="/" className="link link--color-blue text-center">
              Forgot Password?
            </a>
            <Button size="medium" type="primary" submit className="mtb-20">
              Login
            </Button>
            <p className="text-center">
              Not a member?
              <Link to="/register" className="link link--color-blue">
                {" "}
                Register now
              </Link>
            </p>
          </Form>
        </Card>
      </Container>
    </div>
  );
};