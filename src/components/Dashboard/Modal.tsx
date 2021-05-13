import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { axios } from "api";
import { newUser } from "utils/types";

type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
};

export const Modal: React.FC<Props> = ({ isModalOpen, closeModal }) => {
  const [newUser, setNewUser] = useState<Partial<newUser>>({});

  const mutation = useMutation<unknown, unknown, Partial<newUser>>((bodyData) =>
    axios.post("/users", bodyData)
  );

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(e);
    mutation.mutate(newUser);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
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
            value={newUser?.firstName}
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
            value={newUser?.lastName}
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
            value={newUser?.email}
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
