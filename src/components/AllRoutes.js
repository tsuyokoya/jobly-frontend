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
import UserContext from "./UserContext";
import PrivateRoutes from "./PrivateRoutes";
import { decodeToken } from "react-jwt";

const AllRoutes = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    JoblyApi.token = token;
    const user = decodeToken(token);
    setCurrentUser(user);
    localStorage.setItem("jobly-token", token);
  }, [token]);

  const login = async (data) => {
    const res = await JoblyApi.login(data);
    setToken(res.token);
    return { success: true };
  };

  const logout = async (data) => {
    setToken(null);
    setCurrentUser(null);
    localStorage.setItem("jobly-token", null);
  };

  return (
    <BrowserRouter>
      <Navbar logout={logout} />
      <Routes>
        <Route path="/" element={<Homepage username={currentUser} />}></Route>
        <Route path="/login" element={<Login login={login} />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/companies"
          element={
            <UserContext.Provider value={{ currentUser }}>
              <PrivateRoutes>
                <CompanyList />
              </PrivateRoutes>
            </UserContext.Provider>
          }
        ></Route>
        <Route
          path="/companies/:handle"
          element={
            <UserContext.Provider value={{ currentUser }}>
              <PrivateRoutes>
                <CompanyDetail />
              </PrivateRoutes>
            </UserContext.Provider>
          }
        ></Route>
        <Route
          path="/jobs"
          element={
            <UserContext.Provider value={{ currentUser }}>
              <PrivateRoutes>
                <JobList />
              </PrivateRoutes>
            </UserContext.Provider>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <UserContext.Provider value={{ currentUser }}>
              <PrivateRoutes>
                <Profile />
              </PrivateRoutes>
            </UserContext.Provider>
          }
        ></Route>
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
