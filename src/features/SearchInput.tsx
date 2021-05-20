import { InputSearch } from "@ebs-integrator/react-ebs-ui";
import { createPortal } from "react-dom";

export const SearchInput: React.FC = ({ children}) => {
  return createPortal(
    <>
    <InputSearch
      styleType={styleType}
      iconAlign="prefix"
      placeholder="Search for something"
    />,
    <div>{messege}</div>
    </>
    document.body
  );
};
