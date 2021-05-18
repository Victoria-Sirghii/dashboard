import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { axios } from "api";
import { User } from "types/interfaces";
import { Input, Label, Button, Modal } from "components";

type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
  editUser: User | null;
};

export const ModalComponent: React.FC<Props> = ({
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

  const mutation = useMutation<unknown, unknown, Partial<User | null>>(
    (bodyData) => axios.post("/users", bodyData)
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
    <Modal visible={isModalOpen}>
      <form className="form d-flex flex-column" onSubmit={submitHandler}>
        <Label htmlFor="firstName">First name</Label>
        <Input
          size="large"
          type="text"
          placeholder="John"
          name="firstName"
          id="firstName"
          value={user?.first_name}
          onChange={handleChange}
        />
        <Label htmlFor="lastName">Last name</Label>
        <Input
          size="large"
          type="text"
          placeholder="Halep"
          name="lastName"
          id="lastName"
          value={user?.last_name}
          onChange={handleChange}
        />
        <Label htmlFor="email">Email</Label>
        <Input
          size="large"
          type="email"
          placeholder="jogn.halep@gmail.com"
          name="email"
          id="email"
          value={user?.email}
          onChange={handleChange}
        />
        <Label htmlFor="avatar">Avatar</Label>
        <Input
          size="large"
          type="text"
          placeholder="img.jpg"
          name="avatar"
          id="avatar"
          value={user?.avatar}
          onChange={handleChange}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="pointer"
        >
          Submit
        </Button>
      </form>
      <Button className="close-modal-btn" onClick={closeModal}>
        <CloseIcon />
      </Button>
    </Modal>
  );
};
