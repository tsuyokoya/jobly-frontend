import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar as ReactstrapNavbar, Nav, NavItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

import "./Navbar.css";

const Navbar = ({ logout, token }) => {
  return token === null ? (
    // Navbar view if not logged in
    <ReactstrapNavbar className="fixed-top" color="light">
      <Nav>
        <NavItem className="p-1">
          <NavLink className="nav-link text-decoration-none text-dark" to="/">
            <FontAwesomeIcon icon={faBriefcase} /> Jobly
          </NavLink>
        </NavItem>
        <NavItem className="p-1">
          <NavLink
            className="nav-link text-decoration-none text-dark"
            to="/login"
          >
            Login
          </NavLink>
        </NavItem>
        <NavItem className="p-1">
          <NavLink
            className="nav-link text-decoration-none text-dark"
            to="/signup"
          >
            Signup
          </NavLink>
        </NavItem>
      </Nav>
    </ReactstrapNavbar>
  ) : (
    // Navbar view if logged in
    <ReactstrapNavbar className="fixed-top" color="light">
      <Nav>
        <NavItem className="p-1">
          <NavLink className="nav-link text-decoration-none text-dark" to="/">
            <FontAwesomeIcon icon={faBriefcase} /> Jobly
          </NavLink>
        </NavItem>
        <NavItem className="p-1">
          <NavLink
            className="nav-link text-decoration-none text-dark"
            to="/companies"
          >
            Companies
          </NavLink>
        </NavItem>
        <NavItem className="p-1">
          <NavLink
            className="nav-link text-decoration-none text-dark"
            to="/jobs"
          >
            Jobs
          </NavLink>
        </NavItem>
        <NavItem className="p-1">
          <NavLink
            className="nav-link text-decoration-none text-dark"
            to="/profile"
          >
            Profile
          </NavLink>
        </NavItem>
        <NavItem className="p-1">
          <NavLink
            className="nav-link text-decoration-none text-dark"
            to="/logout"
            onClick={logout}
          >
            Logout
          </NavLink>
        </NavItem>
      </Nav>
    </ReactstrapNavbar>
  );
};

export default Navbar;
