import { useContext, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./AuthProvider";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Forgot from "./pages/Login/Forgot";
import Login from "./pages/Login/Login";
import Reset from "./pages/Login/Reset";
import Profile from "./pages/Profile/Profile";

import EventDetails from "./pages/EventDetails/EventDetails";

import Signin from "./pages/Signin/Signin";


function App() {
  const { logged, setLogged } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" exact />
        <Route element={<Dashboard />} path="/dashboard" exact />
        <Route element={<Profile />} path="/profile" exact />
        <Route element={<Login />} path="/login" exact />

        <Route element={<EventDetails />} path="/:eventID" />

        <Route element={<Signin />} path="/signin" exact />
        <Route element={<Forgot />} path="/forgot" exact />
        <Route element={<Reset />} path="/reset/:id" exact />

      </Routes>
    </>
  );
}

export default App;
