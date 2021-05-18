import { axios } from "api";
import { useState } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { Post } from "types/interfaces";
import { Input, Label, Button, Card } from "components";

export const NewPostForm: React.FC = () => {
  const [newPost, setNewPost] = useState<Partial<Post>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const mutation = useMutation<unknown, unknown, Partial<Post>>((bodyData) =>
    axios.post("/unknown", bodyData)
  );

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    mutation.mutate(newPost);
  };

  return (
    <div className="content-container">
      <Card className="d-flex flex-column width-400 mn-auto">
        <h2 className="h2__title">New post</h2>
        <form className="form d-flex flex-column" onSubmit={submitHandler}>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            placeholder="cerulean"
            name="name"
            id="name"
            value={newPost.name}
            onChange={handleChange}
            required
          />
          <Label htmlFor="color">Color</Label>
          <Input
            type="text"
            placeholder="#98B2D1"
            name="color"
            id="color"
            value={newPost?.color}
            onChange={handleChange}
            required
          />
          <Label htmlFor="year">Year</Label>
          <Input
            type="text"
            placeholder="2005"
            name="year"
            id="year"
            value={newPost?.year}
            onChange={handleChange}
            required
          />
          <Label htmlFor="pantone_value">Pantone value</Label>
          <Input
            type="text"
            placeholder="15-4020"
            name="pantone_value"
            id="pantone_value"
            value={newPost?.pantone_value}
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
              Add post
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
