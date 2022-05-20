import React, { useState, useEffect, useContext } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./navbarNew.css";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../../assets/logo_all-in-qr-livetag-withe.svg";
import { AuthContext } from "../../AuthProvider";

function NavbarNew() {
  const { logged } = useContext(AuthContext);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" onClick={closeMobileMenu}>
            <img className="logo" src={Logo} alt="Logo All-in-QR" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <GiHamburgerMenu />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                All Events
              </Link>
            </li>

            {/* {logged && (
              <li className="nav-item">
                <Link to="/pro" className="nav-links" onClick={closeMobileMenu}>
                  Pro Home
                </Link>
              </li>
            )} */}

            {logged && (
              <li className="nav-item">
                <Link
                  to="/dashboard"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
              </li>
            )}
            {logged && (
              <li className="nav-item">
                <Link
                  to="/profile"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
              </li>
            )}

            {!logged && (
              <li>
                <Link
                  to="/login"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Sign Up as Pro
                </Link>
              </li>
            )}
          </ul>
          {button && !logged && (
            <Button buttonStyle="btn--outline">SIGN UP AS PRO</Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavbarNew;
