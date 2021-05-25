import { axios } from "api";
import { useMutation, useQuery } from "react-query";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  Button,
  Form,
  Card,
  useForm,
  Textarea,
  InputSelect,
  DatePicker,
  Select,
} from "ebs-design";
import { Task, Post } from "types/interfaces";
import { Loading } from "features";
import { useEffect, useState } from "react";

type IdParams = {
  id: string;
};

export const EditTask: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [filterData, setFilterData] = useState([]);

  const [form] = useForm();
  let { id } = useParams<IdParams>();
  let history = useHistory();

  const users = useQuery(
    "posts",
    async () => {
      const { data } = await axios.get("/posts");

      return data;
    },
    {
      onSuccess: (res) => {
        setFilterData(res);
      },
    }
  );

  const { data = [], isLoading } = useQuery("tasks", async () => {
    const { data } = await axios.get(`tasks/${id}`);

    form.setFieldsValue({
      date: data.date,
      task: data.task,
      comments: data.comments,
      deadline: data.deadline,
      priority: data.priority,
      user: data.user,
    });
    return data;
  });

  const updateUser = useMutation<unknown, unknown, Partial<Post>>(
    (bodyData) => axios.patch(`/tasks/${id}`, bodyData),
    {
      onSuccess: () => {
        history.push("/dashboard/tasks/?page=1");
      },
    }
  );

  const submitHandler = (data: Task) => {
    updateUser.mutate(data);
  };

  useEffect(() => {
    if (search.length > 0) {
      setFilterData(
        users.data.filter(
          (post: Post) =>
            post.firstName.includes(search) || post.lastName.includes(search)
        )
      );
    } else {
      setFilterData(users.data);
    }
  }, [search]);

  if (isLoading) {
    return <Loading className="loading-center" />;
  }

  return (
    <div className="content-container">
      <Card className="d-flex flex-column width-400 mn-auto p-20 flow-auto">
        <h2 className="h2__title">New Task</h2>
        <Form
          className="form d-flex flex-column"
          onFinish={submitHandler}
          form={form}
          type="horizontal"
          initialValues={{
            date: new Date().toLocaleDateString(),
          }}
        >
          <Form.Field name="date" label="Start Date">
            <DatePicker type="date" dateFormat="dd-MM-yyyy" />
          </Form.Field>
          <Form.Field name="task" label="Task">
            <Textarea placeholder="fix all bugs" />
          </Form.Field>
          <Form.Field name="comments" label="Comments">
            <Textarea placeholder="data should be updated" />
          </Form.Field>
          <Form.Field name="deadline" label="Submit Date">
            <DatePicker
              type="date"
              dateFormat="dd-MM-yyyy"
              placeholderText="10-09-2021"
            />
          </Form.Field>
          <Form.Field name="priority" label="Priority">
            <InputSelect
              options={[
                {
                  value: "info",
                  text: "low",
                },
                {
                  value: "warning",
                  text: "medium",
                },
                {
                  value: "danger",
                  text: "high",
                },
              ]}
            />
          </Form.Field>
          <Form.Field name="user" label="User" className="">
            <Select mode="single" placeholder="Select">
              <Select.Search onSearch={(value) => setSearch(value)} />

              <Select.Options>
                {filterData.map((user: Post) => (
                  <Select.Options.Item
                    key={user.id}
                    value={user.firstName + " " + user.lastName}
                  >
                    {user.firstName + " " + user.lastName}
                  </Select.Options.Item>
                ))}
              </Select.Options>
            </Select>
          </Form.Field>
          <div className="mn-auto">
            <Button
              submit
              size="medium"
              type="primary"
              className="pointer m-10"
            >
              Add post
            </Button>
            <Link to="/dashboard/tasks">
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
