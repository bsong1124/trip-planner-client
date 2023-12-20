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
      
      // Under the hood: depending on the architecture of the application, this code can be used to prevent the application from loading, though a redirect call could navigate a user to an error page.
      
      const onRedirectCallback = (appState) => {
        navigate(appState?.returnTo || window.location.pathname);
      
        // this function will be used by Auth0 Provider to check the component appState prop and determine a redirect location, or will return the current page
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