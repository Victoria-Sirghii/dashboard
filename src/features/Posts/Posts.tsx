import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Table,
  SortBy,
  Checkbox,
  InputSearch,
} from "@ebs-integrator/react-ebs-ui";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { axios } from "api";
import { SearchInput } from "features/SearchInput";
import { Loading } from "features";
import { Post, Sort, Checks } from "../../types/interfaces";

type FilterType = keyof Post;

export const Posts: React.FC = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number[]>([]);
  const [filter, setFilter] = useState<FilterType>();
  const [checked, setChecked] = useState(false);
  const [checkeds, setCheckeds] = useState<Checks>({});
  const [searchItem, setSearchItem] = useState<string>("");
  const [filterData, setFilterData] = useState([]);

  const { data = [], isLoading } = useQuery(
    ["post", page],
    async () => {
      const { data } = await axios.get("unknown?page=" + page);

      const pages = Math.ceil(data.total / data.per_page);
      const newArray: number[] = Array.from({ length: pages }, (x, i) => i + 1);

      setTotalPages(newArray);

      return data.data;
    },
    {
      onSuccess: (res) => {
        setFilterData(res);
      },
    }
  );

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
      title: (
        <Checkbox
          checked={checked}
          onChange={(value) => {
            setChecked(value);

            data.forEach((item: Post, index: number) =>
              setCheckeds((prevState) => ({
                ...prevState,
                [index]: value,
              }))
            );
          }}
        />
      ),
      render: (record: Post, row: Post, index: number) => (
        <Checkbox
          checked={checkeds[index]}
          onChange={(value) => {
            if (value === false && checked === true) {
              setChecked(false);
            }
            setCheckeds((prevState) => ({
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
      render: (post: Post) => (
        <Link to={`/dashboard/posts/${post.id}`}>{post.name}</Link>
      ),
    },
    { title: "Year", dataIndex: "year", filter: "year" },
    { title: "Color", dataIndex: "color" },
    { title: "Pantone value", dataIndex: "pantone_value" },
    {
      title: "Edit",
      render: (post: Post) => (
        <Link to={`/dashboard/posts/edit/${post.id}`}>
          <EditIcon className="pointer" />
        </Link>
      ),
    },
    {
      title: "Remove",
      render: (post: Post) => (
        <DeleteIcon
          className="pointer"
          onClick={() => mutation.mutate(post.id)}
        />
      ),
    },
  ];

  useEffect(() => {
    if (filter) {
      if (filter[0] === "-") {
        const v = filter.slice(1) as FilterType;
        setFilterData(data.sort((a: Post, b: Post) => (a[v] > b[v] ? 1 : -1)));
      } else {
        setFilterData(
          data.sort((a: Post, b: Post) => (a[filter] > b[filter] ? -1 : 1))
        );
      }
    }
    if (searchItem.length > 0) {
      setFilterData(
        data.filter((item: Post) => item.name.includes(searchItem))
      );
    }
  }, [data, filter, searchItem]);

  const sortOptions: Sort[] =
    columns
      .filter((column) => column.filter)
      .map((column) => ({
        title: column.title as React.ReactNode,
        value: column.filter!,
      })) || [];

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("page", page.toString());

    history.push({ search: params.toString() });
  }, [page, history]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <SearchInput className="">
        <InputSearch
          iconAlign="prefix"
          placeholder="Search for color"
          onSearch={(value) => setSearchItem(value)}
        />
      </SearchInput>
      <div className="content-container">
        <div className="d-flex space-between mb-50">
          <SortBy
            options={sortOptions}
            value={filter as any}
            onChange={(value) => setFilter(value as FilterType)}
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
    </>
  );
};
