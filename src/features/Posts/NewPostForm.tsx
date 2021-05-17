import { axios } from "api";
import { useState } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { Post } from "types/interfaces";

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
      <div className="box d-flex flex-column">
        <h2 className="h2-title">New post</h2>
        <form className="form d-flex flex-column" onSubmit={submitHandler}>
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            type="text"
            className="form__field"
            placeholder="cerulean"
            name="name"
            id="name"
            value={newPost.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="color" className="label">
            Color
          </label>
          <input
            type="text"
            className="form__field"
            placeholder="#98B2D1"
            name="color"
            id="color"
            value={newPost?.color}
            onChange={handleChange}
            required
          />
          <label htmlFor="year" className="label">
            Year
          </label>
          <input
            type="text"
            className="form__field"
            placeholder="2005"
            name="year"
            id="year"
            value={newPost?.year}
            onChange={handleChange}
            required
          />
          <label htmlFor="pantone_value" className="label">
            Pantone value
          </label>
          <input
            type="text"
            className="form__field"
            placeholder="15-4020"
            name="pantone_value"
            id="pantone_value"
            value={newPost?.pantone_value}
            onChange={handleChange}
            required
          />
          <div className="buttons-form">
            <button type="submit" className="btn-add">
              Add post
            </button>
            <Link to="/dashboard/posts">
              <button className="btn-cancel">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
