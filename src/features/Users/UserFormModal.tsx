import CloseIcon from "@material-ui/icons/Close";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { axios } from "api";
import { Button, Form, Input, Modal, useForm } from "ebs-design";
import { User } from "types/interfaces";

type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
  editUser: User | null;
};

export const UserFormModal: React.FC<Props> = ({
  isModalOpen,
  closeModal,
  editUser,
}) => {
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue({
      firstName: editUser?.first_name,
      lastName: editUser?.last_name,
      email: editUser?.email,
      avatar: editUser?.avatar,
    });
  }, [editUser, form]);

  const mutation = useMutation<unknown, unknown, Partial<User | null>>(
    (bodyData) => axios.post("/users", bodyData),
    {
      onSuccess: closeModal,
    }
  );
  const updateUser = useMutation<unknown, unknown, Partial<User | null>>(
    (bodyData) => axios.patch(`/users/${bodyData?.id}`, bodyData),
    {
      onSuccess: closeModal,
    }
  );

  const submitHandler = (data: any) => {
    if (editUser) {
      // mutate = (bodyData) => axios.patch(`/users/${bodyData?.id}`, bodyData)
      updateUser.mutate(data);
    } else {
      mutation.mutate(data);
    }
  };

  return (
    <Modal mask={isModalOpen}>
      <Form
        className="modal-form d-flex flex-column"
        onFinish={submitHandler}
        form={form}
      >
        <Form.Field name="firstName" label="First Name">
          <Input size="large" type="text" placeholder="John" />
        </Form.Field>
        <Form.Field name="lastName" label="Last Name">
          <Input size="large" type="text" placeholder="Halep" />
        </Form.Field>
        <Form.Field name="email" label="Email">
          <Input size="large" type="email" placeholder="jogn.halep@gmail.com" />
        </Form.Field>
        <Form.Field name="avatar" label="Avatar">
          <Input size="large" type="text" placeholder="img.jpg" />
        </Form.Field>
        <Button submit type="primary" size="medium" className="pointer mtb-20">
          Submit
        </Button>
      </Form>
      <CloseIcon className="close-modal-btn" onClick={closeModal} />
    </Modal>
  );
};
