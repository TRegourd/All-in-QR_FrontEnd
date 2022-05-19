import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Forgot from "./pages/Login/Forgot";
import Login from "./pages/Login/Login";
import Reset from "./pages/Login/Reset";
import Profile from "./pages/Profile/Profile";
import Signin from "./pages/Signin/Signin";
import Register from "./pages/Register/Register";
import EventDetailsAndTab from "./pages/EventDetails/EventDetailsAndTab";

import VideoHome from "./pages/Home/VideoHome";
import NavbarNew from "./components/Navbar/NavbarNew";
import Payment from "./pages/Payment/Payment";
import PaymentSucceed from "./pages/Payment/PaymentSucceed";
import AllEventsHome from "./pages/AllEvents/AllEventsHome";

function App() {
  return (
    <>
      <NavbarNew />
      <Routes>
        <Route element={<VideoHome />} path="/" exact />
        <Route element={<AllEventsHome />} path="/allEvents" exact />
        <Route element={<Dashboard />} path="/dashboard" exact />
        <Route element={<Profile />} path="/profile" exact />
        <Route element={<Login />} path="/login" exact />
        <Route element={<EventDetailsAndTab />} path="/:eventID" />
        <Route element={<Signin />} path="/signin" exact />
        <Route element={<Forgot />} path="/forgot" exact />
        <Route element={<Reset />} path="/reset/:id" exact />
        <Route element={<Payment />} path="/payment" exact />
        <Route element={<PaymentSucceed />} path="/payment/succeed" exact />
        <Route element={<Register />} path="/register/:eventId/:roleId" exact />
      </Routes>
    </>
  );
}

export default App;
