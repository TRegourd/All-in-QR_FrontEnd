import { Button } from "@mui/material";
import React from "react";

import "./HeaderVideo.css";
import HomeVideo from "../../../assets/video.mp4";

function HeaderVideo() {
  return (
    <div className="hero-container">
      <video src={HomeVideo} autoPlay loop muted />
      <h1>All in QR</h1>
      <p>Make your events managment easier</p>
      <div className="hero-btns">
        <Button className="btns"></Button>
        <Button className="btns" variant="outlined">
          GET STARTED
        </Button>
        <Button
          className="btns"
          onClick={console.log("hey")}
          variant="contained"
        >
          WATCH TRAILER
        </Button>
      </div>
    </div>
  );
}

export default HeaderVideo;
