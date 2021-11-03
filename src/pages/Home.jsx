import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  return (
    <div>
      <button onClick={() => loginWithRedirect()}>Log In</button>;
      <img style={{ with: 20, height: 50, float: "left" }} src="logo.png" />
    </div>
  );
}
