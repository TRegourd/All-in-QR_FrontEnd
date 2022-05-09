import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./AuthProvider";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Forgot from "./pages/Login/Forgot";
import Login from "./pages/Login/Login";
import Reset from "./pages/Login/Reset";
import Profile from "./pages/Profile/Profile";
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
      </Routes>
    </>
  );
}

export default App;
