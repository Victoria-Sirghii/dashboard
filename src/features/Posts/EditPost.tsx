import { axios } from "api";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Form, Input } from "@ebs-integrator/react-ebs-ui";
import { Post } from "types/interfaces";
// import { Input, Label, Card } from "components/index";

type IdParams = {
  id: string;
};

export const EditPost: React.FC = () => {
  const [post, setPost] = useState<Partial<Post>>({});
  let { id } = useParams<IdParams>();

  const { isLoading } = useQuery("post", async () => {
    const { data } = await axios.get(`unknown/${id}`);
    setPost(data.data);

    return data.data;
  });

  const updateUser = useMutation<unknown, unknown, Partial<Post>>((bodyData) =>
    axios.patch(`/unknown/${bodyData?.id}`, bodyData)
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  const submitHandler = (data: any) => {
    updateUser.mutate(data);
  };

  return (
    <div className="content-container">
      <Card className="d-flex flex-column width-400 mn-auto  p-20">
        <Form
          className="form d-flex flex-column"
          initialValues={{
            name: post.name,
            color: post.color,
            year: post.year,
            pantone_value: post.pantone_value,
          }}
          onFinish={submitHandler}
        >
          <Form.Field name="name" label="Color name">
            <Input size="large" type="text" name="name" />
          </Form.Field>
          <Form.Field name="color" label="Color">
            <Input size="large" type="text" name="color" />
          </Form.Field>
          <Form.Field name="year" label="Year">
            <Input size="large" type="text" name="year" />
          </Form.Field>
          <Form.Field name="pantone_value" label="Pantone value">
            <Input size="large" type="text" name="pantone_value" />
          </Form.Field>
          <div className="mn-auto">
            <Button
              submit
              size="medium"
              type="primary"
              className="pointer m-10"
            >
              Edit post
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
