import { ListGroup } from "ebs-design";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Task } from "types/interfaces";

interface Props {
  tasksList: { task: string; id: number }[];
  setTasksList: (taskList: { task: string; id: number }[]) => void;
}

export const TaskList: React.FC<Props> = ({ tasksList, setTasksList }) => {
  const removeTask = (id: number) => {
    const newList = tasksList.filter((item) => item.id !== id)
    setTasksList(newList)
  };

  return (
    <ListGroup className="list-relative fit-content">
      {tasksList.map((item, index) => {
        return (
          <ListGroup.Item key={index} className="p-5 d-flex align-center">
            {index + 1}. {item.task}
            <HighlightOffIcon
              className="ml-5"
              onClick={() => removeTask(item.id)}
            />
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};
