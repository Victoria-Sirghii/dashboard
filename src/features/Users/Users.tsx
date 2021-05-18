import { useQuery, useMutation, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DeleteIcon from "@material-ui/icons/Delete";
import { axios } from "api";
import { ModalComponent } from "features";
import { User } from "types/interfaces";
import { Button } from "components";

export const Users: React.FC = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const [page, setPage] = useState<number | string>(1);
  const [totalPages, setTotalPages] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<Partial<User> | null>(null);

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
        <Button
          size="medium"
          type="primary"
          className="pointer"
          onClick={openModal}
        >
          Add user
        </Button>
      </div>
      <table className="table">
        <tr>
          <th>
            <input type="checkbox" id="check-all" />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Edit</th>
          <th>Remove</th>
        </tr>
        {data &&
          data.map((user: User) => {
            const { id, email, first_name, last_name, avatar } = user;
            return (
              <tr key={id}>
                <td>
                  <input type="checkbox" id="check" />
                </td>
                <td className="name-box">
                  <img src={avatar} alt="user" className="user-avatar" />
                  <Link to={`/dashboard/users/${id}`}>
                    <span className="name name-center">
                      {first_name} {last_name}
                    </span>
                  </Link>
                </td>
                <td>{email}</td>
                <td>
                  <EditIcon
                    className="pointer"
                    onClick={() => editHandler(user)}
                  />
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
      {isModalOpen && (
        <ModalComponent
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
              type="outline"
              htmlType="button"
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
