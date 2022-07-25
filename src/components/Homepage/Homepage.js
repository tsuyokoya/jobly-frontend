import React from "react";

const Homepage = ({ user }) => {
  const welcomeMsg = user ? (
    <p>Welcome back, {user.firstName}</p>
  ) : (
    <p>Log In or Sign Up to Use!</p>
  );
  return (
    <div>
      <h1>Jobly</h1>
      <p>All the fake jobs in one, convenient place.</p>
      {welcomeMsg}
    </div>
  );
};

export default Homepage;
