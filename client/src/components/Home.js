import React from "react";
import { useAuth0 } from "../react-auth0-spa";

function Home() {
  const { loading, user } = useAuth0();
  if (loading || !user) {
    return <div>Hi! Please log in or create a user.</div>;
  }
  return (
    <>
      <p>Hi, {user.nickname}!</p>
      <p>{user.email}</p>
    </>
  );
}

export default Home;
