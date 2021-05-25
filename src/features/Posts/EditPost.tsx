import { axios } from "api";
import { useMutation, useQuery } from "react-query";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  Button,
  Card,
  Form,
  Input,
  useForm,
  Textarea,
  InputSelect,
  InputPhone,
  DatePicker,
  Radio,
} from "ebs-design";
import { Post } from "types/interfaces";

type IdParams = {
  id: string;
};

export const EditPost: React.FC = () => {
  const [form] = useForm();
  let { id } = useParams<IdParams>();
  let history = useHistory();

  const { data = [], isLoading } = useQuery("post", async () => {
    const { data } = await axios.get(`posts/${id}`);

    const { age, bio, birthday, firstName, sex, phone, lastName } = data;

    form.setFieldsValue({
      age: age,
      bio: bio,
      birthday: birthday,
      firstName: firstName,
      sex: sex,
      phone: phone,
      lastName: lastName,
    });

    return data;
  });

  const updateUser = useMutation<unknown, unknown, Partial<Post>>(
    (bodyData) => axios.patch(`/posts/${id}`, bodyData),
    {
      onSuccess: () => {
        history.push("/dashboard/posts/?page=1");
      },
    }
  );

  const submitHandler = (data: Post) => {
    updateUser.mutate(data);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="content-container">
      <Card className="d-flex flex-column width-400 mn-auto  p-20">
        <Form
          className="form d-flex flex-column"
          onFinish={submitHandler}
          form={form}
        >
          <Form.Field name="firstName" label="First Name">
            <Input type="text" size="large" placeholder="Eva" />
          </Form.Field>
          <Form.Field name="lastName" label="Last Name">
            <Input type="text" size="large" placeholder="Everest" />
          </Form.Field>
          <Form.Field name="bio" label="Biography">
            <Textarea />
          </Form.Field>
          <Form.Field name="age" label="Age">
            <InputSelect
              options={[
                { value: "0-60", text: "0-60" },
                { value: "60-90", text: "60-90" },
                { value: "90-120", text: "90-120" },
              ]}
            />
          </Form.Field>
          <Form.Field name="sex" label="Sex">
            <Radio
              options={[
                { text: "Male", value: "m" },
                { text: "Female", value: "f" },
              ]}
            />
          </Form.Field>
          <Form.Field name="birthday" label="Birthday">
            <DatePicker
              type="date"
              placeholderText="Birthday"
              dateFormat="dd-MM-yyyy"
            />
          </Form.Field>
          <Form.Field
            name="phone"
            label="Phone Nr:"
            extra="This field is required"
          >
            <InputPhone />
          </Form.Field>
          <div className="mn-auto">
            <Button
              submit
              size="medium"
              type="primary"
              className="pointer m-10"
            >
              Edit post
            </Button>
            <Link to="/dashboard/posts">
              <Button size="medium" type="ghost" className="pointer m-10">
                Cancel
              </Button>
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};
