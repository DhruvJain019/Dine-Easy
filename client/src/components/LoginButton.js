import "./LoginButton.css";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { user,loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <p>Loading login details...</p>;
  }

  

  if (isAuthenticated) {
    return (
      <ul>
        <li>
      <p className="username">{user.name}</p></li>
      <li><button
        className="button-login"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
      <b> LOGOUT</b>
      </button></li>
      </ul>
    );
  }

  return (
    <button className="button-login" onClick={() => loginWithRedirect()}>
     <b>LOGIN </b>
    </button>
  );
};

export default LoginButton;
