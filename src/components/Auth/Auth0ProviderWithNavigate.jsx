import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router";

import config from "../../config";

export default function Auth0ProviderWithNavigate({ children }) {
  const navigate = useNavigate();

  const domain = config.AUTH0_DOMAIN;
  const clientId = config.AUTH0_CLIENT_ID;
  const redirectUri = config.AUTH0_CALLBACK;

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
