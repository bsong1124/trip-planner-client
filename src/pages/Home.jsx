import React from "react";
import "./Home.css";
import LoginButton from "../components/Auth/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, isLoading: loadingAuth, isAuthenticated } = useAuth0();

  return (
    <div className="home-wrapper">
      <h1 className="header-title">Welcome to Journey Craft</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      {isAuthenticated && !loadingAuth ? (
        <Link to="/trips" className="btn-primary">
          My Trips
        </Link>
      ) : (
        <LoginButton />
      )}
    </div>
  );
};

export default Home;
