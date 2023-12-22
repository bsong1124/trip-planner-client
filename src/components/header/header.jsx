import { Link } from "react-router-dom";
// Auth0 imports
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Auth/LoginButton";
import LogoutButton from "../Auth/LogoutButton";

const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <header className="flex items-center justify-around bg-emerald-100 text-sm sm:text-xl text-emerald-500 mb-6 sm:mb-8 p-2 sticky top-0">
      <nav
        id="left-nav"
        className="flex items-center justify-between font-nav font-light"
      >
        <Link to="/">
          <img className="w-16 logo-img" src="../../../images/favicon.png" />{" "}
        </Link>
        <Link className="btn-nav sm:m-2.5" to="/">
          Home
        </Link>
        <Link className="btn-nav m-0.25 sm:m-2.5" to="/trips">
          My Trips
        </Link>
        <Link className="btn-nav m-0.25 sm:m-2.5" to="/about">
          About
        </Link>
      </nav>
      <nav id="right-nav" className="flex justify-end">
        {!isLoading ? (
          isAuthenticated ? (
            <>
              <Link className="mr-2" to="/trips">
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
