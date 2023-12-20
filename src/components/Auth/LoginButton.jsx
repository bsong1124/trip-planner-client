import { useAuth0 } from "@auth0/auth0-react";
import './Button.css'
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
    });
  };

  return <button className="login-btn" onClick={handleLogin}>Log In</button>;
};

export default LoginButton;
