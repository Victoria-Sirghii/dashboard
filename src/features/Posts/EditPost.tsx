import { axios } from "api";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { Post } from "types/interfaces";
import { Input, Label, Button, Card } from "components/index";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  const submitHandler = (e: React.SyntheticEvent) => {
    console.log(post);

    e.preventDefault();
    updateUser.mutate(post);
  };

  return (
    <div className="content-container">
      <Card boxShadow="2" className="d-flex flex-column width-400 mn-auto">
        <form className="form d-flex flex-column" onSubmit={submitHandler}>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            placeholder="cerulean"
            name="name"
            id="name"
            value={post?.name}
            onChange={handleChange}
            required
          />
          <Label htmlFor="color">Color</Label>
          <Input
            type="text"
            placeholder="#98B2D1"
            name="color"
            id="color"
            value={post?.color}
            onChange={handleChange}
            required
          />
          <Label htmlFor="year">Year</Label>
          <Input
            type="text"
            placeholder="2005"
            name="year"
            id="year"
            value={post?.year}
            onChange={handleChange}
            required
          />
          <Label htmlFor="pantone_value">Pantone value</Label>
          <Input
            type="text"
            placeholder="15-4020"
            name="pantone_value"
            id="pantone_value"
            value={post?.pantone_value}
            onChange={handleChange}
            required
          />
          <div className="mn-auto">
            <Button
              htmlType="submit"
              size="medium"
              type="primary"
              className="pointer"
            >
              Edit post
            </Button>
            <Link to="/dashboard/posts">
              <Button size="medium" type="outline" className="pointer">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};
