import { Button, Table, SortBy, Label, Checkbox } from "ebs-design";
import cn from "classnames";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { axios } from "api";
import { useEffect, useState } from "react";
import { Task, Sort, Subtask } from "types/interfaces";
import { Loading } from "features";

type FilterType = keyof Task;

interface UpdatedData {
  id: number;
  tasks: Subtask[];
}

export const Tasks: React.FC = () => {
  const queryClient = useQueryClient();
  const [totalPages, setTotalPages] = useState<number[]>([]);
  const [filter, setFilter] = useState<FilterType>();
  const [filterData, setFilterData] = useState([]);
  const [checkTasks, setCheckTasks] = useState<any>({});

  const [page, setPage] = useState<number>(1);

  const { data = [], isLoading } = useQuery(
    ["tasks", page],
    async () => {
      const { data, headers } = await axios.get(
        `/tasks?_page=${page}&_limit=6`
      );

      const pages = Math.ceil(headers["x-total-count"] / 6);
      const newArray: number[] = Array.from({ length: pages }, (x, i) => i + 1);

      setTotalPages(newArray);

      return data;
    },
    {
      onSuccess: (res) => {
        setFilterData(res);
      },
    }
  );

  const mutation = useMutation((id: number) => axios.delete(`/tasks/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  const updateTask = useMutation(
    (data: UpdatedData) =>
      axios.patch(`/tasks/${data.id}`, {
        tasks: data.tasks,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
      },
    }
  );

  const columns = [
    {
      title: "Start Date",
      dataIndex: "date",
      filter: "date",
    },
    {
      title: "Task",
      dataIndex: "tasks",
      render: (items: Subtask[] = [], record: Subtask, rowIdx: number) => {
        return items.map((item, taskIndex) => (
          <div
            className={cn("d-flex", { "tx-line": item.done })}
            key={taskIndex}
          >
            <Checkbox
              className="mr-5"
              checked={checkTasks?.[rowIdx]?.[taskIndex]?.done || item.done}
              onChange={(value) => {
                setCheckTasks((prevState: any) => ({
                  ...prevState,
                  [rowIdx]: {
                    ...prevState[rowIdx],
                    [taskIndex]: {
                      ...prevState?.[rowIdx]?.[taskIndex],
                      done: value,
                    },
                  },
                }));

                updateTask.mutate({
                  id: record.id,
                  tasks: items.map((i) =>
                    i.id === item.id ? { ...item, done: value } : i
                  ),
                });

                // item.done = value;
                // const updateData = filterData.map(
                //   (itemData: any, iIdx: number) => {
                //     if (idx === iIdx) {
                //       return {
                //         ...itemData,
                //         tasks: itemData.tasks.map((task: any) => {
                //           if (item.id === task.id) {
                //             return {
                //               ...task,
                //               done: value,
                //             };
                //           }
                //           return task;
                //         }),
                //       };
                //     }
                //     return itemData;
                //   }
                // );

                // setFilterData(updateData);
              }}
            />
            {item.task}
          </div>
        ));
      },
    },
    {
      title: "Comments",
      dataIndex: "comments",
    },
    {
      title: "Submit Date",
      dataIndex: "deadline",
      filter: "deadline",
    },
    {
      title: "Priority",
      filter: "priority",
      render: (tasks: Task) => {
        return (
          <Label
            status={tasks.priority as any}
            text={
              ((tasks.priority as any) === "info" && "low") ||
              ((tasks.priority as any) === "warning" && "medium") ||
              ((tasks.priority as any) === "danger" && "high")
            }
            type="fill"
          />
        );
      },
    },
    {
      title: "User",
      dataIndex: "user",
      filter: "user",
    },
    {
      title: "Edit",
      render: (tasks: Task) => (
        <Link to={`/dashboard/tasks/edit/${tasks.id}`}>
          <EditIcon className="pointer" />
        </Link>
      ),
    },
    {
      title: "Remove",
      render: (tasks: Task) => (
        <DeleteIcon
          className="pointer"
          onClick={() => {
            mutation.mutate(tasks.id);
          }}
        />
      ),
    },
  ];

  const handlePage = (index: number) => {
    setPage(index);
  };

  useEffect(() => {
    if (filter) {
      if (filter[0] === "-") {
        const v = filter.slice(1) as FilterType;

        setFilterData(data.sort((a: Task, b: Task) => (a[v] > b[v] ? 1 : -1)));
      } else {
        setFilterData(
          data.sort((a: Task, b: Task) => (a[filter] > b[filter] ? -1 : 1))
        );
      }
    }
  }, [filter]);

  const sortOptions: Sort[] =
    columns
      .filter((column) => column.filter)
      .map((column) => ({
        title: column.title as React.ReactNode,
        value: column.filter!,
      })) || [];

  if (isLoading) {
    return <Loading className="loading-center" />;
  }
  return (
    <div className="content-container">
      <div className="d-flex space-between mb-50">
        <SortBy
          options={sortOptions}
          value={filter as any}
          onChange={(value) => setFilter(value as FilterType)}
        />
        <Link to="/dashboard/tasks/create">
          <Button size="medium" type="primary" className="pointer">
            Add task
          </Button>
        </Link>
      </div>

      <Table data={filterData} columns={columns} rowKey="id" />

      <div className="box-btns d-flex">
        {totalPages.map((item, index) => {
          return (
            <Button
              key={index}
              size="small"
              className="pointer m-5"
              onClick={() => handlePage(index + 1)}
            >
              {index + 1}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
