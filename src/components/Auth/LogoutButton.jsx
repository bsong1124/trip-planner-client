import { useAuth0 } from "@auth0/auth0-react";
import './Button.css'

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className="btn-nav p-1 m-2.5 login-btn"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
