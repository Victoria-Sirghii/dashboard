import { axios } from "api";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { NewPost, IdParams } from "types/types";

export const EditPost: React.FC = () => {
  const [post, setPost] = useState<Partial<NewPost>>({});
  let { id } = useParams<IdParams>();

  const { isLoading } = useQuery("post", async () => {
    const { data } = await axios.get(`unknown/${id}`);
    setPost(data.data);

    return data.data;
  });

  const updateUser = useMutation<unknown, unknown, Partial<NewPost>>(
    (bodyData) => axios.patch(`/unknown/${bodyData?.id}`, bodyData)
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
      <div className="box d-flex flex-column">
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
            value={post?.name}
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
            value={post?.color}
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
            value={post?.year}
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
            value={post?.pantone_value}
            onChange={handleChange}
            required
          />
          <div className="buttons-form">
            <button type="submit" className="btn-add">
              Edit post
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
