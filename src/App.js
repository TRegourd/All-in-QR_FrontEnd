import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./AuthProvider";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";

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
      </Routes>
    </>
  );
}

export default App;
