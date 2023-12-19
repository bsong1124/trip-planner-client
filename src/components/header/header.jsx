import { Link } from "react-router-dom";
import "./Nav.css";
import LoginButton from "../Auth/LoginButton";

const Header = () => {
  return (
    <nav className="Nav">
      <Link to="/">Home
        {/* <img src={brandImage} /> */}
      </Link>
      <div>
        <LoginButton />
      </div>
      <Link to="/trips">My Trips</Link>
      {/* <Link to="/trips/:id/activities">Activities</Link> */}
      <Link to="/about">About</Link>
    </nav>
  );
};

export default Header;
