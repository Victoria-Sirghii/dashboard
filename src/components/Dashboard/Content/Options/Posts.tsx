import { axios } from "api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DeleteIcon from "@material-ui/icons/Delete";
import { NewPost, IdParams } from "types/types";

export const Posts: React.FC = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<any[]>([]);
  const [editPost, setEditPost] = useState<Partial<NewPost> | null>(null);
  const { id } = useParams<IdParams>();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(["post", page], async () => {
    const { data } = await axios.get("unknown?page=" + page);
    const pages = Math.ceil(data.total / data.per_page)
    const newArray:any[] = [] = Array.from({length: pages}, (x,i) => i + 1);
    setTotalPages(newArray)
    return data.data;
  });

  const mutation = useMutation(
    (postId: string) => axios.delete(`/unknown/${postId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );
  const handlePage = (index:any) => {
    setPage(index)
  }

  const editHandler = (post: any) => {
    setEditPost(post);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="content-container">
      <div className="content-header d-flex">
        <p className="sort-box d-flex">
          Company: <span className="bl-color"> All</span>{" "}
          <ArrowDropDownIcon className="pointer" />
        </p>
        <Link to="/dashboard/post/create">
          <button className="add-btn pointer">Add color</button>
        </Link>
      </div>
      <table className="table">
        <tr>
          <th>
            <input type="checkbox" id="check-all" />
          </th>
          <th>Name</th>
          <th>Year</th>
          <th>Color</th>
          <th>Pantone value</th>
          <th>Edit</th>
          <th>Remove</th>
        </tr>
        {data.map((post: any) => {
          const { id, name, year, color, pantone_value } = post;
          return (
            <tr key={id}>
              <td>
                <input type="checkbox" id="check" />
              </td>
              <td className="name-box">
                <Link to={`/dashboard/post/${id}`}>{name}</Link>
              </td>
              <td>{year}</td>
              <td>{color}</td>
              <td>{pantone_value}</td>
              <td>
                <Link to={`/dashboard/post/edit/${id}`} className="edit-link">
                  <EditIcon
                    className="pointer"
                    onClick={() => editHandler(post)}
                  />
                </Link>
              </td>
              <td>
                <DeleteIcon
                  className="pointer"
                  onClick={() => mutation.mutate(id)}
                />
              </td>
            </tr>
          );
        })}
      </table>
      <div className="page-btns d-flex">
          {totalPages.map((item, index) => {
              return (
              <button
                key={index}
                className="page-btn btn"
                onClick={() => handlePage(index+1)}
              >
                {index + 1}
              </button>)
            })}
      </div>
    </div>
  );
};