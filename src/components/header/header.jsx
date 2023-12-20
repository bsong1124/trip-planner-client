import { Link } from "react-router-dom";
import "./Nav.css";
// Auth0 imports
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Auth/LoginButton";
import LogoutButton from "../Auth/LogoutButton";

const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <nav className="Nav">
      <Link to="/"><img className="logo-img" src="../../../public/images/favicon.png"/> </Link>
      {/* The default UI (brand logo and app name)*/}
      <Link className="nav-el" to="/">
        Home
        {/* <img src={brandImage} /> */}
      </Link>
      <Link className="nav-el" to="/trips">
        My Trips
      </Link>
      {/* <Link to="/trips/:id/activities">Activities</Link> */}
      <Link className="nav-el" to="/about">
        About
      </Link>
      <div className="auth-buttons">
        {/* Nested ternary to conditionally render multiple states */}
        {!isLoading ? (
          // if the loading variable is true - the ! will convert it to false and 'null' will be returned
          // if the loading variable is false - the ! will convert it to true and the next ternary will evaluate
          // if the user is authenticated (isAuthenticated === true), then a profile link and logout button are visible, otherwise, it will display the login button
          isAuthenticated ? (
            <span>
              {/* <Link to="/profile">Profile</Link> */}
              <Link className="nav-el" to="/profile">
                <img
                  src={user.picture}
                  alt={`Picture of ${user.name}`}
                  className="avatar"
                />
              </Link>
              <LogoutButton className="nav-el" />
            </span>
          ) : (
            <LoginButton className="nav-el" />
          )
        ) : null}
      </div>
    </nav>
  );
};

export default Header;
