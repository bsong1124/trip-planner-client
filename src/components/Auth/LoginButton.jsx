import { useAuth0 } from "@auth0/auth0-react";
import './Button.css'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/trips",
      },
    });
  };

  return <button className="btn btn-primary" onClick={handleLogin}>Log In</button>;
};

export default LoginButton;
