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
  Textarea,
  InputSelect,
  Radio,
  DatePicker,
  InputPhone,
} from "ebs-design";
import { Post } from "types/interfaces";

export const NewPostForm: React.FC = () => {
  const [form] = useForm();
  let history = useHistory();

  const mutation = useMutation<unknown, unknown, Partial<Post>>(
    (bodyData) => axios.post("/posts", bodyData),
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
          type="horizontal"
        >
          <Form.Field name="firstName" label="First Name">
            <Input type="text" size="large" placeholder="Eva" />
          </Form.Field>
          <Form.Field name="lastName" label="Last Name">
            <Input type="text" size="large" placeholder="Everest" />
          </Form.Field>
          <Form.Field name="bio" label="Biography">
            <Textarea />
          </Form.Field>
          <Form.Field name="age" label="Age">
            <InputSelect
              options={[
                { value: 2, text: "0-60" },
                { value: 3, text: "60-90" },
                { value: 4, text: "90-120" },
              ]}
            />
          </Form.Field>
          <Form.Field name="sex" label="Sex">
            <Radio
              options={[
                { text: "Male", value: "m" },
                { text: "Female", value: "f" },
              ]}
            />
          </Form.Field>
          <Form.Field name="birthday" label="Birthday">
            <DatePicker
              type="date"
              placeholderText="Birthday"
              dateFormat="dd-MM-yyyy"
            />
          </Form.Field>
          <Form.Field name="phone" label="Phone Nr:">
            <InputPhone />
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
