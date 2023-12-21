import { Link } from "react-router-dom";
import "./Nav.css";
// Auth0 imports
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Auth/LoginButton";
import LogoutButton from "../Auth/LogoutButton";

const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <header className="flex items-center justify-around font-nav font-extralight text-sm sm:text-xl text-emerald-500 m-2 sm:m-8">
      <nav id="left-nav" className="flex items-center justify-between">
        <Link to="/">
          <img className="w-16 logo-img" src="../../../images/favicon.png" />{" "}
        </Link>
        {/* The default UI (brand logo and app name)*/}
        <Link
          className="btn-nav sm:m-2.5"
          to="/"
        >
          Home
          {/* <img src={brandImage} /> */}
        </Link>
        <Link
          className="btn-nav m-0.25 sm:m-2.5"
          to="/trips"
        >
          My Trips
        </Link>
        {/* <Link to="/trips/:id/activities">Activities</Link> */}
        <Link
          className="btn-nav m-0.25 sm:m-2.5"
          to="/about"
        >
          About
        </Link>
      </nav>
      <nav id="right-nav" className="flex justify-end">
        {/* Nested ternary to conditionally render multiple states */}
        {!isLoading ? (
          // if the loading variable is true - the ! will convert it to false and 'null' will be returned
          // if the loading variable is false - the ! will convert it to true and the next ternary will evaluate
          // if the user is authenticated (isAuthenticated === true), then a profile link and logout button are visible, otherwise, it will display the login button
          isAuthenticated ? (
            <>
              {/* <Link to="/profile">Profile</Link> */}
              <Link className=" mr-2" to="/profile">
                <img
                  src={user.picture}
                  alt={`Picture of ${user.name}`}
                  className="w-12 rounded-full avatar invisible sm:visible"
                />
              </Link>
              <LogoutButton />
            </>
          ) : (
            <LoginButton />
          )
        ) : null}
      </nav>
    </header>
  );
};

export default Header;
