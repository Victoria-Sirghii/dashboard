import {
  Container,
  Card,
  Button,
  Input,
  Label,
  Form,
  DatePicker,
} from "ebs-design";

import EditIcon from "@material-ui/icons/Edit";

export const Profile: React.FC = () => {
  return (
    <Container className="width-850 p-40">
      <Card className="p-80">
        <h2 className="h2__title-border mb-20">Public Profile</h2>
        <Form className="width-400 mn-auto">
          <div className="d-flex flex-column align-center">
            <h3 className="mb-20"> Profile picture</h3>
            <img
              src="https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png"
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
          <Form.Field name="Password" label="Password">
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