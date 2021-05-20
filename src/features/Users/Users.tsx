import { useQuery, useMutation, useQueryClient } from "react-query";
import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Table, SortBy, Checkbox } from "@ebs-integrator/react-ebs-ui";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { axios } from "api";
import { UserFormModal } from "features";
import { User } from "types/interfaces";

export const Users: React.FC = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const [page, setPage] = useState<number | string>(1);
  const [totalPages, setTotalPages] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [editUser, setEditUser] = useState<Partial<User> | null>(null);
  const [checked, setChecked] = useState(false);
  const [checkeds, setCheckeds] = useState<any>({});

  const openModal: () => void = () => {
    setIsModalOpen(true);
  };

  const closeModal: () => void = () => {
    if (editUser) {
      setEditUser(null);
    }
    setIsModalOpen(false);
  };

  const { data = [], isLoading } = useQuery(["users", page], async () => {
    const { data } = await axios.get("users?page=" + page);

    const pages = Math.ceil(data.total / data.per_page);
    const newArray: number[] = Array.from({ length: pages }, (x, i) => i + 1);

    setTotalPages(newArray);

    return data.data;
  });

  const mutation = useMutation(
    (id: number | undefined) => axios.delete(`/users/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );

  const editHandler = (user: User) => {
    setEditUser(user);
    setIsModalOpen(true);
  };

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
      title: "Avatar",
      render: (user: any) => (
        <img src={user.avatar} alt="user" className="user-avatar" />
      ),
    },
    {
      title: "Name",
      filter: "first_name",
      render: (user: any) => (
        <Link to={`/dashboard/users/${user.id}`}>
          <span className="name name-center">
            {user.first_name} {user.last_name}
          </span>
        </Link>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      filter: "email",
    },
    {
      title: "Edit",
      render: (user: any) => (
        <EditIcon className="pointer" onClick={() => editHandler(user)} />
      ),
    },
    {
      title: "Remove",
      render: (user: any) => (
        <DeleteIcon
          className="pointer"
          onClick={() => mutation.mutate(user.id)}
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
        <Button
          size="medium"
          type="primary"
          className="pointer"
          onClick={openModal}
        >
          Add user
        </Button>
      </div>

      <Table data={filterData} columns={columns} />

      {isModalOpen && (
        <UserFormModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          editUser={editUser}
        />
      )}
      <div className="box-btns d-flex">
        {totalPages.map((item, index) => {
          return (
            <Button
              size="small"
              type="ghost"
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
