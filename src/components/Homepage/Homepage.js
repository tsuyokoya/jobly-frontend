import React from "react";
import ReactRotatingText from "react-rotating-text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

import "./Homepage.css";

const rotatingTextItems = [
  "Accountant",
  "Manager",
  "Executive",
  "Engineer",
  "Consultant",
  "Operator",
  "Adviser",
];

const Homepage = ({ user }) => {
  const welcomeMsg = user ? (
    <p className="display-6">Welcome back, {user.firstName}</p>
  ) : (
    <p className="display-6">Log In or Sign Up to use!</p>
  );
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="display-1">
        <FontAwesomeIcon icon={faBriefcase} />
        Jobly
      </h1>

      <p className="display-6">All the fake jobs in one, convenient place.</p>
      {welcomeMsg}
      <ReactRotatingText
        className="display-6"
        items={rotatingTextItems}
        color="blue"
      />
    </div>
  );
};

export default Homepage;
