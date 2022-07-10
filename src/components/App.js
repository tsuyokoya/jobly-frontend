import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import "./App.css";

function App(props) {
  return (
    <>
      <AllRoutes />
    </>
  );
}

export default App;
