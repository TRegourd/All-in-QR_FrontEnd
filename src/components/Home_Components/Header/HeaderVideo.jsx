import { Button } from "@mui/material";
import React from "react";

import "./HeaderVideo.css";
import HomeVideo from "../../../assets/video.mp4";
import Link from "react-scroll/modules/components/Link";

function HeaderVideo() {
  return (
    <div className="header-container">
      <video src={HomeVideo} autoPlay loop muted />
      <h1>All in QR</h1>
      <p>Make your events managment easier</p>
      <div className="header-btns">
        <Button className="btns"></Button>
        <Button className="btns" variant="contained">
          GET STARTED
        </Button>
        <Link to="contact" smooth>
          <Button
            className="btns"
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
