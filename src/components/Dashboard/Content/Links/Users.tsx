import { axios } from "api";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DeleteIcon from "@material-ui/icons/Delete";
import { useState } from "react";
import { Modal } from "components";
import { NewUser } from "types/types";

export const Users: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<Partial<NewUser> | null>(null);
  const queryClient = useQueryClient();

  const openModal: () => void = () => {
    setIsModalOpen(true);
  };

  const closeModal: () => void = () => {
    if (editUser) {
      setEditUser(null);
    }
    setIsModalOpen(false);
  };

  const { data = [], isLoading } = useQuery(["users"], async () => {
    const { data } = await axios.get("users");
    return data.data;
  });

  const mutation = useMutation(
    (userId: string) => axios.delete(`/users/${userId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );

  const editHandler = (user: any) => {
    setEditUser(user);
    setIsModalOpen(true);
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
        <button className="add-btn pointer" onClick={openModal}>
          Add user
        </button>
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
          data.map((user: any) => {
            const { id, email, first_name, last_name, avatar } = user;
            return (
              <tr key={id}>
                <td>
                  <input type="checkbox" id="check" />
                </td>
                <td className="name-box">
                  <img src={avatar} alt="user" className="user-avatar" />
                  <Link to={`/dashboard/user/${id}`}>
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
        <Modal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          editUser={editUser}
        />
      )}
    </div>
  );
};
