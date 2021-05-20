import { SearchInput } from "features";

export const HeaderContent: React.FC = () => {
  return (
    <div className="header">
      <div className="d-flex header--center">
        <SearchInput />
      </div>
    </div>
  );
};
