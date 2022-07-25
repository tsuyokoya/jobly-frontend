import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ logout, token }) => {
  return token === null ? (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Signup</NavLink>
    </nav>
  ) : (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/companies">Companies</NavLink>
      <NavLink to="/jobs">Jobs</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/" onClick={logout}>
        Logout
      </NavLink>
    </nav>
  );
};

export default Navbar;
