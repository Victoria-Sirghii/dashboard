import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DeleteIcon from "@material-ui/icons/Delete";
import { axios } from "api";
import { Post } from "types/interfaces";
import { Button } from "components";

export const Posts: React.FC = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number[]>([]);

  const { data, isLoading } = useQuery(["post", page], async () => {
    const { data } = await axios.get("unknown?page=" + page);

    const pages = Math.ceil(data.total / data.per_page);
    const newArray: number[] = Array.from({ length: pages }, (x, i) => i + 1);
    setTotalPages(newArray);

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
  const handlePage = (index: number) => {
    setPage(index);
  };

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("page", page.toString());

    history.push({ search: params.toString() });
  }, [page, history]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="content-container">
      <div className="d-flex space-between">
        <p className="sort-box d-flex">
          Company: <span className="color-blue pl-5"> All</span>{" "}
          <ArrowDropDownIcon className="pointer" />
        </p>
        <Link to="/dashboard/posts/create">
          <Button size="medium" type="primary" className="pointer">
            Add color
          </Button>
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
        {data.map((post: Post) => {
          const { id, name, year, color, pantone_value } = post;
          return (
            <tr key={id}>
              <td>
                <input type="checkbox" id="check" />
              </td>
              <td className="name-box">
                <Link to={`/dashboard/posts/${id}`}>{name}</Link>
              </td>
              <td>{year}</td>
              <td>{color}</td>
              <td>{pantone_value}</td>
              <td>
                <Link
                  to={`/dashboard/posts/edit/${id}`}
                  className="icon--color-darkgray"
                >
                  <EditIcon className="pointer" />
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
      <div className="box-btns d-flex">
        {totalPages.map((item, index) => {
          return (
            <Button
              size="small"
              type="outline"
              className="pointer"
              onClick={() => handlePage(index + 1)}
            >
              {index + 1}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
