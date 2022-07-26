import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import CompanyList from "./CompanyList/CompanyList";
import CompanyDetail from "./CompanyDetail/CompanyDetail";
import JobList from "./JobList/JobList";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import ProfileForm from "./ProfileForm/ProfileForm";
import Navbar from "./Navbar/Navbar";
import JoblyApi from "../api";
import PrivateRoute from "./PrivateRoute";
import { decodeToken } from "react-jwt";

const AllRoutes = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("jobly-token");
    return savedToken || null;
  });

  useEffect(() => {
    const setUser = async () => {
      const username = decodeToken(token).username;
      await getUserData(username);
    };
    if (token !== null) {
      JoblyApi.token = token;
      localStorage.setItem("jobly-token", token);
      setUser();
    }
  }, [token]);

  const login = async (data) => {
    try {
      const res = await JoblyApi.login(data);
      setToken(res.token);
      return { success: true };
    } catch {
      alert("Invalid username/password");
    }
  };

  const logout = async (data) => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem("jobly-token");
  };

  const register = async (data) => {
    const res = await JoblyApi.register(data);
    setToken(res.token);
    return { success: true };
  };

  const getUserData = async (username) => {
    const res = await JoblyApi.getUserData(username);
    setCurrentUser(res.user);
    return res.user;
  };

  const updateUserData = async (data, username) => {
    const res = await JoblyApi.updateUserData(data, username);
    setCurrentUser(res.user);
    return { success: true };
  };

  return (
    <BrowserRouter>
      <Navbar logout={logout} token={token} />
      <Routes>
        <Route path="/" element={<Homepage user={currentUser} />}></Route>
        <Route path="/logout" element={<Navigate to="/" replace />}></Route>
        <Route path="/login" element={<Login login={login} />}></Route>
        <Route path="/signup" element={<Signup register={register} />}></Route>
        <Route
          path="/companies"
          element={
            <PrivateRoute currentUser={currentUser}>
              <CompanyList />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/companies/:handle"
          element={
            <PrivateRoute currentUser={currentUser}>
              <CompanyDetail currentUser={currentUser} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/jobs"
          element={
            <PrivateRoute currentUser={currentUser}>
              <JobList currentUser={currentUser} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <PrivateRoute currentUser={currentUser}>
              <ProfileForm
                updateUserData={updateUserData}
                currentUser={currentUser}
              />
            </PrivateRoute>
          }
        ></Route>
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
