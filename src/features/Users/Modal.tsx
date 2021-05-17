import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { axios } from "api";
import { User } from "types/interfaces";

type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
  editUser: User | null;
};

export const Modal: React.FC<Props> = ({
  isModalOpen,
  closeModal,
  editUser,
}) => {
  const [user, setUser] = useState<Partial<User | null>>({});

  useEffect(() => {
    setUser({
      id: editUser?.id,
      first_name: editUser?.first_name,
      last_name: editUser?.last_name,
      email: editUser?.email,
      avatar: editUser?.avatar,
    });

    return () => setUser({});
  }, [editUser]);

  const mutation = useMutation<unknown, unknown, Partial<User | null>>((bodyData) =>
    axios.post("/users", bodyData)
  );
  const updateUser = useMutation<unknown, unknown, Partial<User | null>>(
    (bodyData) => axios.patch(`/users/${bodyData?.id}`, bodyData)
  );

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (editUser) {
      // mutate = (bodyData) => axios.patch(`/users/${bodyData?.id}`, bodyData)
      updateUser.mutate(user);
    } else {
      mutation.mutate(user);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div
      className={`${
        isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container">
        <form className="form d-flex flex-column" onSubmit={submitHandler}>
          <label htmlFor="firstName" className="label">
            First name
          </label>
          <input
            type="text"
            className="form__field"
            placeholder="John"
            name="firstName"
            id="firstName"
            value={user?.first_name}
            onChange={handleChange}
          />
          <label htmlFor="lastName" className="label">
            Last name
          </label>
          <input
            type="text"
            className="form__field"
            placeholder="Halep"
            name="lastName"
            id="lastName"
            value={user?.last_name}
            onChange={handleChange}
          />
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            className="form__field"
            placeholder="jogn.halep@gmail.com"
            name="email"
            id="email"
            value={user?.email}
            onChange={handleChange}
          />
          <label htmlFor="avatar" className="label">
            Avatar
          </label>
          <input
            type="text"
            className="form__field"
            placeholder="img.jpg"
            name="avatar"
            id="avatar"
            value={user?.avatar}
            onChange={handleChange}
          />
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
        <button className="close-modal-btn" onClick={closeModal}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
