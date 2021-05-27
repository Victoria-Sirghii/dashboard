import {
  Container,
  Card,
  Button,
  Input,
  Form,
  DatePicker,
  useForm,
} from "ebs-design";

import EditIcon from "@material-ui/icons/Edit";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { axios } from "api";
import { useUser } from "context";

export const Profile: React.FC = () => {
  const [form] = useForm();
  const [userAvatar, setUserAvatar] = useState("");
  const { data } = useUser();

  useEffect(() => {
    setUserAvatar(data.avatar);
    form.setFieldsValue({
      firstName: data.firstName,
      lastName: data.lastName,
      birthday: data.birthday,
      email: data.email,
      password: data.password,
    });
  }, [data]);

  return (
    <Container className="width-850 p-40">
      <Card className="p-80">
        <h2 className="h2__title-border mb-20">Public Profile</h2>
        <Form className="width-400 mn-auto" form={form}>
          <div className="d-flex flex-column align-center">
            <h3 className="mb-20"> Profile picture</h3>
            <img
              src={userAvatar}
              alt="random"
              className="user-image width-150 pointer"
            />
            <Button
              size="small"
              type="primary"
              className="btn-add-img"
              prefix={<EditIcon fontSize="small" />}
            ></Button>
          </div>
          <div className="d-flex gap-15">
            <Form.Field name="firstName" label="First Name">
              <Input size="medium" type="text" />
            </Form.Field>
            <Form.Field name="lastName" label="Last Name">
              <Input size="medium" type="text" />
            </Form.Field>
          </div>
          <Form.Field name="birthday" label="Birthday">
            <DatePicker dateFormat="dd-MM-yyyy" />
          </Form.Field>
          <Form.Field name="email" label="Email">
            <Input size="medium" type="email" name="email" />
          </Form.Field>
          <Form.Field name="password" label="Password">
            <Input size="medium" type="password" className="mb-20" />
          </Form.Field>
          <Button
            size="medium"
            type="primary"
            className="d-flex mn-auto width-150"
            submit
          >
            Update Profile
          </Button>
        </Form>
      </Card>
    </Container>
  );
};
