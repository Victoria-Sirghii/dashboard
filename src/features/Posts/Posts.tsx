import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEffect, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Table, SortBy, Checkbox } from "@ebs-integrator/react-ebs-ui";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { axios } from "api";
import { Options } from "@ebs-integrator/react-ebs-ui/dist/components/molecules/Select/Options";

export const Posts: React.FC = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number[]>([]);
  const [filter, setFilter] = useState("name");
  const [checked, setChecked] = useState(false);
  const [checkeds, setCheckeds] = useState<any>({});

  const { data = [], isLoading } = useQuery(["post", page], async () => {
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

  console.log("checkeds", checkeds);

  const columns = [
    {
      title: (
        <Checkbox
          checked={checked}
          onChange={(value) => {
            setChecked(value);

            data.forEach((item: any, index: number) =>
              setCheckeds((prevState: any) => ({
                ...prevState,
                [index]: value,
              }))
            );
          }}
        />
      ),
      render: (record: any, row: any, index: number) => (
        <Checkbox
          checked={checkeds[index]}
          onChange={(value) => {
            setCheckeds((prevState: any) => ({
              ...prevState,
              [index]: value,
            }));
          }}
        />
      ),
    },
    {
      title: "Name",
      filter: "name",
      render: (post: any) => (
        <Link to={`/dashboard/posts/${post.id}`}>{post.name}</Link>
      ),
    },
    { title: "Year", dataIndex: "year", filter: "year" },
    { title: "Color", dataIndex: "color" },
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

  const filterData = useMemo(() => {
    if (filter[0] === "-") {
      const v = filter.slice(1);

      return data.sort((a: any, b: any) => (a[v] > b[v] ? 1 : -1));
    } else {
      return data.sort((a: any, b: any) => (a[filter] > b[filter] ? -1 : 1));
    }
  }, [data, filter]);

  const sortOptions =
    columns
      .filter((column) => column.filter)
      .map((column) => ({
        title: column.title,
        value: column.filter,
      })) || [];

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
        <SortBy
          options={sortOptions as any}
          value={filter as any}
          onChange={(value) => setFilter(value)}
        />
        <Link to="/dashboard/posts/create">
          <Button size="medium" type="primary" className="pointer">
            Add color
          </Button>
        </Link>
      </div>

      <Table data={filterData} columns={columns} rowKey="id" />

      <div className="box-btns d-flex">
        {totalPages.map((item, index) => {
          return (
            <Button
              key={index}
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
