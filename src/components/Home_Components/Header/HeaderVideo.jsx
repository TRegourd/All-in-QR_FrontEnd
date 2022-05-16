import { Button } from "@mui/material";
import React from "react";

import "./HeaderVideo.css";
import HomeVideo from "../../../assets/video.mp4";
import Link from "react-scroll/modules/components/Link";
import { Link as RouterLink } from "react-router-dom";

function HeaderVideo() {
  return (
    <div className="header-container">
      <video src={HomeVideo} autoPlay loop muted />
      <h1>All in QR</h1>
      <p>Make your events managment easier</p>
      <div className="header-btns">
        <Button className="btns"></Button>
        <RouterLink to="login" smooth>
          <Button className="btns contained" variant="contained">
            GET STARTED
          </Button>
        </RouterLink>
        <Link to="contact" smooth>
          <Button
            className="btns outlined"
            onClick={console.log("hey")}
            variant="outlined"
          >
            CONTACT US
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HeaderVideo;
