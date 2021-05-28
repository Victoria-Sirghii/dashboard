import { useState } from "react";
import { ListGroup, Checkbox } from "ebs-design";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditIcon from "@material-ui/icons/Edit";
import cn from "classnames";

interface Props {
  tasksList: { task: string; id: number; done: boolean }[];
  setTasksList: (
    taskList: { task: string; id: number; done: boolean }[]
  ) => void;
}

interface CheckProp {
  [key: number]: {
    done: boolean;
  };
}

interface InputType {
  [key: number]: boolean;
}

export const EditTaskList: React.FC<Props> = ({ tasksList, setTasksList }) => {
  const [checkTasks, setCheckTasks] = useState<CheckProp>({});
  const [inputsShow, setInputsShow] = useState<InputType>({});
  const [inputValue, setInputValue] = useState<string>("");

  const removeTask = (id: number) => {
    const newList = tasksList.filter((item) => item.id !== id);
    setTasksList(newList);
  };

  const showInput = (index: number) => {
    setInputsShow((prevState) => ({
      ...prevState,
      [index]: true,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const editTask = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      setTasksList(
        tasksList.map((item, i) => {
          if (i === index) {
            item.task = inputValue;
          }
          return item;
        })
      );
      setInputsShow((prevState) => ({
        ...prevState,
        [index]: false,
      }));
    }
  };

  return (
    <ListGroup className="list-relative width-230">
      {tasksList.map((item, index) => {
        return (
          <div key={index}>
            <ListGroup.Item
              key={index}
              className={cn("d-flex", "p-5", "align-center", {
                "tx-line": item.done,
              })}
            >
              <div className="width-190 d-flex">
                <Checkbox
                  checked={checkTasks?.[index]?.done || item.done}
                  onChange={(value) => {
                    setCheckTasks((prevState) => ({
                      ...prevState,
                      [index]: {
                        ...prevState?.[index],
                        done: value,
                      },
                    }));
                    item.done = value;
                  }}
                />

                <input
                  type="text"
                  defaultValue={item.task}
                  placeholder="edit"
                  className={cn(
                    "input-inline",
                    "width-90",
                    { "d-none": !inputsShow[index] },
                    {
                      "d-block": inputsShow[index],
                    }
                  )}
                  onChange={handleChange}
                  onKeyPress={(e) => editTask(e, index)}
                />
                <span
                  className={cn(
                    { "d-block": !inputsShow[index] },
                    {
                      "d-none": inputsShow[index],
                    }
                  )}
                >
                  {item.task}
                </span>
              </div>
              <div>
                <EditIcon
                  className="pointer"
                  onClick={() => showInput(index)}
                />
              </div>
              <div>
                <HighlightOffIcon
                  className="ml-5 pointer"
                  onClick={() => removeTask(item.id)}
                />
              </div>
            </ListGroup.Item>
          </div>
        );
      })}
    </ListGroup>
  );
};
