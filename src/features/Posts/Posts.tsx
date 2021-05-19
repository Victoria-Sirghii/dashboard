import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Table } from "@ebs-integrator/react-ebs-ui";
import EditIcon from "@material-ui/icons/Edit";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DeleteIcon from "@material-ui/icons/Delete";
import { axios } from "api";
// import { Button } from "components";

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

  const columns = [
    {
      title: <input type="checkbox" id="check-all" />,
      render: (record: any) => <input type="checkbox" id="check" />,
    },
    {
      title: "Name",
      render: (post: any) => (
        <Link to={`/dashboard/posts/${post.id}`}>{post.name}</Link>
      ),
    },
    { title: "Year", dataIndex: "year" },
    { title: "Color", dataIndex: "color" },
    { title: "Year", dataIndex: "year" },
    { title: "Pantone value", dataIndex: "pantone_value" },
    {
      title: "Edit",
      render: (post: any) => (
        <Link to={`/dashboard/posts/edit/${post.id}`}>
          <EditIcon className="pointer" />
        </Link>
      ),
    },
    {
      title: "Remove",
      render: (post: any) => (
        <DeleteIcon
          className="pointer"
          onClick={() => mutation.mutate(post.id)}
        />
      ),
    },
  ];

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
      <div className="d-flex space-between mb-50">
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

      <Table data={data} columns={columns} />

      <div className="box-btns d-flex">
        {totalPages.map((item, index) => {
          return (
            <Button
              size="small"
              className="pointer m-5"
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
