import { axios } from "api";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DeleteIcon from "@material-ui/icons/Delete";

export const Posts: React.FC = () => {
  const { data, isLoading } = useQuery("users", async () => {
    const { data } = await axios.get("unknown");
    return data.data;
  });
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="content-container">
      <div className="content-header d-flex">
        <p className="sort-box d-flex">
          Company: <span className="bl-color"> All</span>{" "}
          <ArrowDropDownIcon className="pointer" />
        </p>
        <button className="add-btn pointer">Add color</button>
      </div>
      <table className="table">
        <tr>
          <th>
            <input type="checkbox" id="check-all" />
          </th>
          <th>Name</th>
          <th>Year</th>
          <th>Color</th>
          <th>Pantone value</th>
          <th>Edit</th>
          <th>Remove</th>
        </tr>
        {data.map((item: any) => {
          const { id, name, year, color, pantone_value } = item;
          return (
            <tr key={id}>
              <td>
                <input type="checkbox" id="check" />
              </td>
              <td className="name-box">
                <Link to={`/single-post/${id}`}>{name}</Link>
              </td>
              <td>{year}</td>
              <td>{color}</td>
              <td>{pantone_value}</td>
              <td>
                <EditIcon className="pointer" />
              </td>
              <td>
                <DeleteIcon className="pointer" />
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
