import { useQuery, useMutation, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
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
import { UserFormModal } from "features";
import { SearchInput } from "features/SearchInput";
import { User, Sort, Checks } from "types/interfaces";
import { Loading } from "features";

type FilterType = keyof User;

export const Users: React.FC = () => {
  const queryClient = useQueryClient();
  const history = useHistory();

  const [page, setPage] = useState<number | string>(1);
  const [totalPages, setTotalPages] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<Partial<User> | null>(null);

  const [filter, setFilter] = useState<FilterType>();
  const [checked, setChecked] = useState(false);
  const [checkeds, setCheckeds] = useState<Checks>({});
  const [searchItem, setSearchItem] = useState<string>("");
  const [filterData, setFilterData] = useState([]);

  const openModal: () => void = () => {
    setIsModalOpen(true);
  };

  const closeModal: () => void = () => {
    if (editUser) {
      setEditUser(null);
    }
    setIsModalOpen(false);
  };

  const { data = [], isLoading } = useQuery(
    ["users", page],
    async () => {
      const { data } = await axios.get("users?page=" + page);

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

            data.forEach((item: User, index: number) =>
              setCheckeds((prevState) => ({
                ...prevState,
                [index]: value,
              }))
            );
          }}
        />
      ),
      render: (record: User, row: User, index: number) => (
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
      title: "Avatar",
      render: (user: User) => (
        <img src={user.avatar} alt="user" className="user-avatar" />
      ),
    },
    {
      title: "Name",
      filter: "first_name",
      render: (user: User) => (
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
      render: (user: User) => (
        <EditIcon className="pointer" onClick={() => editHandler(user)} />
      ),
    },
    {
      title: "Remove",
      render: (user: User) => (
        <DeleteIcon
          className="pointer"
          onClick={() => mutation.mutate(user.id)}
        />
      ),
    },
  ];

  useEffect(() => {
    if (filter) {
      if (filter[0] === "-") {
        const v = filter.slice(1) as FilterType;

        setFilterData(
          data.sort((a: User, b: User) => (a[v]! > b[v]! ? 1 : -1))
        );
      } else {
        setFilterData(
          data.sort((a: User, b: User) => (a[filter]! > b[filter]! ? -1 : 1))
        );
      }
    }

    if (searchItem.length > 0) {
      setFilterData(
        data.filter(
          (item: User) =>
            item.first_name?.includes(searchItem) ||
            item.last_name?.includes(searchItem) ||
            item.email?.includes(searchItem)
        )
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
    return <Loading className="loading-center" />;
  }
  return (
    <>
      <SearchInput className="">
        <InputSearch
          iconAlign="prefix"
          placeholder="Search for user"
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
          <Button
            size="medium"
            type="primary"
            className="pointer"
            onClick={openModal}
          >
            Add user
          </Button>
        </div>

        <Table data={filterData} columns={columns} rowKey="id" />

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
                key={index}
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
    </>
  );
};
