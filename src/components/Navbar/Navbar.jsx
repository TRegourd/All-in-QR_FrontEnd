import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { BiHomeCircle, BiUser } from "react-icons/bi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { AuthContext } from "../../AuthProvider";

export default function Navbar() {
  const { logged, setLogged } = useContext(AuthContext);
  const [activeNav, setActiveNav] = useState("#home");
  return (
    <nav>
      <div className="links">
        <Link
          to="/"
          onClick={() => setActiveNav("#home")}
          className={activeNav === "#home" ? "active link" : "link"}
        >
          <BiHomeCircle className="navLogo" />
          <span>Home</span>
        </Link>
        <Link
          to="/dashboard"
          onClick={() => setActiveNav("#dashboard")}
          className={activeNav === "#dashboard" ? "active link" : "link"}
        >
          <MdOutlineSpaceDashboard className="navLogo" />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/profile"
          onClick={() => setActiveNav("#profile")}
          className={activeNav === "#profile" ? "active link" : "link"}
        >
          <BiUser className="navLogo" />
          <span>Profile</span>
        </Link>
      </div>
      {!logged && <Button variant="contained">Login</Button>}
      {logged && <Button variant="contained">Logout</Button>}
    </nav>
  );
}
