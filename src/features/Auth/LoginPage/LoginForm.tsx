import { Link, useHistory } from "react-router-dom";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import axios from "api/axios";
import {
  Button,
  Card,
  Input,
  Container,
  Form,
  useForm,
  Alert,
} from "ebs-design";
import { useLocalStorage } from "hooks";
import { useUser } from "context";
import { User } from "types/interfaces";

interface LogUser {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);

  const [, setStorage] = useLocalStorage();
  const [form] = useForm();
  let history = useHistory();
  const { refetch } = useUser();

  const { data = [] } = useQuery("users", async () => {
    const { data } = await axios.get("users");
    return data;
  });

  const handleSubmit = useCallback(
    (user: LogUser) => {
      data.find((item: User) => {
        if (item.email === user.email && item.password === user.password) {
          setStorage("userId", item.id);
          form.resetFields();
          history.push("/dashboard");
          refetch();
          return item;
        } else {
          setShowAlert(true);
          return item;
        }
      });
    },
    [form, setStorage, data, history, refetch]
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
            {showAlert && (
              <Alert
                message="Your email or password are not correct"
                type="error"
                className="mn-auto p-10 mb-10 "
              />
            )}
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
