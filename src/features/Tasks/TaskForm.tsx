import { axios } from "api";
import { useMutation, useQuery } from "react-query";
import { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import {
  Button,
  Form,
  Card,
  useForm,
  Textarea,
  InputSelect,
  DatePicker,
  Select,
  Input,
} from "ebs-design";
import { Task, User } from "types/interfaces";
import { Loading, TaskList } from "features";

export const TaskForm: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [filterData, setFilterData] = useState([]);
  const [tasksList, setTasksList] = useState<{ task: string; id: number }[]>(
    []
  );

  const [form] = useForm();
  let history = useHistory();

  const { data = [], isLoading } = useQuery(
    "users",
    async () => {
      const { data } = await axios.get("/users");

      return data;
    },
    {
      onSuccess: (res) => {
        setFilterData(res);
      },
    }
  );

  const mutation = useMutation<unknown, unknown, Partial<Task>>(
    (bodyData) => axios.post("/tasks", bodyData),
    {
      onSuccess: () => {
        history.push("/dashboard/tasks/?page=1");
      },
    }
  );

  useEffect(() => {
    if (search.length > 0) {
      setFilterData(
        data.filter(
          (user: User) =>
            user.firstName?.includes(search) || user.lastName?.includes(search)
        )
      );
    } else {
      setFilterData(data);
    }
  }, [search, data]);

  const submitHandler = useCallback(
    (data: Task) => {
      data.tasks = tasksList;
      mutation.mutate(data);
      form.resetFields();
    },
    [form, mutation, tasksList]
  );

  const addTask = () => {
    setTasksList((prevState) => [
      ...prevState,
      { task: form.getFieldValue("tasks"), id: Date.now(), done: false },
    ]);
    form.resetFields(["tasks"]);
  };

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
          <Form.Field name="tasks" label="Task">
            <Input suffix={<AddIcon type="check" onClick={addTask} />} />
          </Form.Field>
          <TaskList tasksList={tasksList} setTasksList={setTasksList} />
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
                  value: "low",
                  text: "low",
                },
                {
                  value: "medium",
                  text: "medium",
                },
                {
                  value: "high",
                  text: "high",
                },
              ]}
            />
          </Form.Field>
          <Form.Field name="user" label="User">
            <Select mode="single" placeholder="Select">
              <Select.Search onSearch={(value) => setSearch(value)} />

              <Select.Options>
                {filterData.map((user: User) => (
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
