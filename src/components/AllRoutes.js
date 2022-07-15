import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import CompanyList from "./CompanyList/CompanyList";
import CompanyDetail from "./CompanyDetail/CompanyDetail";
import JobList from "./JobList/JobList";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Profile from "./Profile/Profile";
import Navbar from "./Navbar/Navbar";
import JoblyApi from "../api";
import { decodeToken } from "react-jwt";

const AllRoutes = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    JoblyApi.token = token;
    console.log(token);
    const user = decodeToken(token);
    setCurrentUser(user);
  }, [token]);

  const login = async (data) => {
    const res = await JoblyApi.login(data);
    setToken(res.token);
    return { success: true };
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Homepage />}></Route>
        <Route exact path="/companies" element={<CompanyList />}></Route>
        <Route
          exact
          path="/companies/:handle"
          element={<CompanyDetail />}
        ></Route>
        <Route exact path="/jobs" element={<JobList />}></Route>
        <Route exact path="/login" element={<Login login={login} />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route path="*" element={<Navigate to="/colors" replace />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
