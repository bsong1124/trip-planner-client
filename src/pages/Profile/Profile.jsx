// ICEBOX - redirect for now

import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user)

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

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
