import React from "react";
import LoginButton from "../components/Auth/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, isLoading: loadingAuth, isAuthenticated } = useAuth0();

  return (
    <div className="flex flex-col items-center mt-32">
      <h1 className="text-4xl sm:text-6xl font-heading font-medium text-center text-emerald-500 m-4">Welcome to Journey Craft</h1>
      <p className="text-2xl sm:text-3xl mb-6">
        It's time to plan your next getaway.
      </p>
      {isAuthenticated && !loadingAuth ? (
        <div className="flex justify-center">
          <Link to="/trips" className="btn btn-primary mr-4">
            My Trips
          </Link>
          <Link to="/about" className="btn btn-secondary">
            Learn more
          </Link>
        </div>
      ) : (
        <div>
        <LoginButton />
        </div>
      )}
      <img src="../../images/favicon.png" alt="Journey Craft" className=" max-w-64 sm:max-w-sm" />
    </div>
  );
};

export default Home;
