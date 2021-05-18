import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";

export const HeaderContent: React.FC = () => {
  return (
    <div className="header">
      <div className="d-flex header--center">
        <div className="search-bar d-flex">
          <SearchIcon className="color-gray" />
          <input
            type="text"
            placeholder="Search for a contact"
            className="field"
          />
        </div>
        <div>
          <NotificationsIcon className="color-gray" />
        </div>
      </div>
    </div>
  );
};
