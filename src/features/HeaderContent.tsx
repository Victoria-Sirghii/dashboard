import { Icon, Card } from "ebs-design";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useClickAway } from "react-use";
import { useUser } from "context";

export const HeaderContent: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { data } = useUser();

  const ref = useRef(null);
  useClickAway(ref, () => {
    setOpenMenu(false);
  });

  const clearStorage = () => {
    localStorage.clear();
  };

  return (
    <div ref={ref} className="header">
      <div className="d-flex header--center" id="portal">
        <div className="d-flex align-center pos-rel-right">
          <img
            src={data?.avatar}
            alt="random"
            className="user-image width-35 pointer"
            onClick={() => setOpenMenu(true)}
          />
          <Icon
            type="arrow-bottom"
            className="m-5 pointer"
            onClick={() => setOpenMenu(true)}
          />
        </div>
        {openMenu && (
          <>
            <Icon type="arrow-top" className="dropdown-arrow" />
            <div className="dropdown">
              <Card>
                <div className="menu-header p-15">
                  <p className="">Signed in as</p>
                  <p className="ft-bold">
                    {data?.firstName} {data?.lastName}
                  </p>
                </div>
                <ul>
                  <Link to="/dashboard/profile">
                    <li className="menu-option">My profile</li>
                  </Link>
                  <Link to="/" onClick={clearStorage}>
                    <li className="menu-option">Log out</li>
                  </Link>
                </ul>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
