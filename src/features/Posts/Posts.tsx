import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Table,
  SortBy,
  Checkbox,
  InputSearch,
  Modal,
  Icon,
  Space,
} from "ebs-design";
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

  const [filter, setFilter] = useState<FilterType>();
  const [checked, setChecked] = useState(false);
  const [checkeds, setCheckeds] = useState<Checks>({});
  const [totalPages, setTotalPages] = useState<number[]>([]);
  const [page, setPage] = useState<number>(1);
  const [filterData, setFilterData] = useState([]);
  const [searchItem, setSearchItem] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [userDelete, setUserDelete] = useState<number>();

  const { data = [], isLoading } = useQuery(
    ["posts", page],
    async () => {
      const { data, headers } = await axios.get(
        `/posts?_page=${page}&_limit=10`
      );

      const pages = Math.ceil(headers["x-total-count"] / 10);
      const newArray: number[] = Array.from({ length: pages }, (x, i) => i + 1);

      setTotalPages(newArray);

      return data;
    },
    {
      onSuccess: (res) => {
        setFilterData(res);
      },
    }
  );

  const mutation = useMutation((id: number) => axios.delete(`/posts/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

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
      title: "First Name",
      filter: "firstName",
      render: (posts: Post) => (
        <Link to={`/dashboard/posts/${posts.id}`}>{posts.firstName}</Link>
      ),
    },
    { title: "Last Name", dataIndex: "lastName", filter: "lastName" },
    { title: "Biography", dataIndex: "bio" },
    { title: "Age", dataIndex: "age", filter: "age" },
    { title: "Sex", dataIndex: "sex" },
    { title: "Birthday", dataIndex: "birthday", filter: "birthday" },
    { title: "Phone Nr", dataIndex: "phone" },
    {
      title: "Edit",
      render: (posts: Post) => (
        <Link to={`/dashboard/posts/edit/${posts.id}`}>
          <EditIcon className="pointer" />
        </Link>
      ),
    },
    {
      title: "Remove",
      render: (posts: Post) => (
        <DeleteIcon
          className="pointer"
          onClick={() => {
            setOpen(true);
            setUserDelete(posts.id);
          }}
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
  }, [filter, data]);

  useEffect(() => {
    if (searchItem.length > 0) {
      setFilterData(
        data.filter((item: Post) => item.firstName.includes(searchItem))
      );
    } else {
      setFilterData(data);
    }
  }, [searchItem]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("page", page.toString());

    history.push({ search: params.toString() });
  }, [page, history]);

  const sortOptions: Sort[] =
    columns
      .filter((column) => column.filter)
      .map((column) => ({
        title: column.title as React.ReactNode,
        value: column.filter!,
      })) || [];

  if (isLoading) {
    return <Loading className="loading-center" />;
  }

  return (
    <>
      {open && (
        <Modal>
          <Modal.Content>
            Are you sure you wish to delete this user?
          </Modal.Content>
          <Modal.Footer>
            <Space justify="space-between">
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                type="primary"
                prefix={<Icon type="check" />}
                onClick={() => {
                  mutation.mutate(userDelete!);
                  setOpen(false);
                }}
              >
                Delete
              </Button>
            </Space>
          </Modal.Footer>
        </Modal>
      )}
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
