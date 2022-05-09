import { useContext, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./AuthProvider";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import EventDetails from "./pages/EventDetails/EventDetails";

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
      </Routes>
    </>
  );
}

export default App;
