import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";

// import resource / api modules if needed

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user)

  // if nested ternary JSX is difficult to read you can chain predicates to render various page states, depending on a user's authentication status:

  // if a user is not logged in, use react-routers navigate component to redirect Profile page to home route

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // if the authentication status is true, but the authentication confirmation is loading, render a message

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  // if a user is authenticated and loading is false, a user object will be populated with the logged user's profile data secured by Auth0 - picture (profile or social media picture), user's name (the email used to sign up if un/pw credentials were used for signup ), and the user.email.

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={`Picture of ${user.name}`} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;
