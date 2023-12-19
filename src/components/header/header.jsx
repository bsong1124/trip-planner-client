import { Link } from "react-router-dom";
import "./Nav.css";
import LoginButton from "../Auth/LoginButton";
import LogoutButton from "../Auth/LogoutButton";

const Header = () => {
  return (
    <nav className="Nav">
      <Link to="/">Home
        {/* <img src={brandImage} /> */}
      </Link>
      <div>
        <LoginButton />
      </div>
      <div>
        <LogoutButton />
      </div>
      <Link to="/trips">My Trips</Link>
      {/* <Link to="/trips/:id/activities">Activities</Link> */}
      <Link to="/about">About</Link>
    </nav>
  );
};

export default Header;
