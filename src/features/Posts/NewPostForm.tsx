import { axios } from "api";
import { useMutation } from "react-query";
import { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Card,
  useForm,
} from "@ebs-integrator/react-ebs-ui";
import { Post } from "types/interfaces";

export const NewPostForm: React.FC = () => {
  const [form] = useForm();
  let history = useHistory();

  const mutation = useMutation<unknown, unknown, Partial<Post>>(
    (bodyData) => axios.post("/unknown", bodyData),
    {
      onSuccess: () => {
        history.push("/dashboard/posts/?page=1");
      },
    }
  );

  const submitHandler = useCallback(
    (data: any) => {
      mutation.mutate(data);
      form.resetFields();
    },
    [form, mutation]
  );

  return (
    <div className="content-container">
      <Card className="d-flex flex-column width-400 mn-auto p-20">
        <h2 className="h2__title">New post</h2>
        <Form
          className="form d-flex flex-column"
          onFinish={submitHandler}
          form={form}
        >
          <Form.Field name="name" label="Color name">
            <Input type="text" size="large" placeholder="cerulean" />
          </Form.Field>
          <Form.Field name="color" label="Color name">
            <Input
              type="text"
              size="large"
              placeholder="#98B2D1"
              name="color"
            />
          </Form.Field>
          <Form.Field name="year" label="Year">
            <Input type="text" size="large" placeholder="2005" name="year" />
          </Form.Field>
          <Form.Field name="pantone_value" label="Pantone value">
            <Input
              type="text"
              size="large"
              placeholder="15-4020"
              name="pantone_value"
            />
          </Form.Field>
          <div className="mn-auto">
            <Button
              submit
              size="medium"
              type="primary"
              className="pointer m-10"
            >
              Add post
            </Button>
            <Link to="/dashboard/posts">
              <Button size="medium" type="ghost" className="pointer m-10">
                Cancel
              </Button>
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};
