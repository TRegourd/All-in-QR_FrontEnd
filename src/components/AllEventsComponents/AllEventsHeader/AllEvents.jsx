import React from "react";
import "./AllEventsHeader.css";
import BgImage from "../../../assets/backgroundEvents.jpeg";
import Link from "react-scroll/modules/components/Link";
import { Button } from "@mui/material";

export default function AllEventsHeader() {
  return (
    <div className="header-container">
      <img className="bg-image" src={BgImage}></img>
      {/* <video src={HomeVideo} autoPlay loop muted /> */}
      <h1>All in QR</h1>
      <p>Explore the Amazing Featured Events</p>
      <div className="header-btns">
        <Button className="btns"></Button>
        <Link to="events" smooth>
          <Button className="btns contained" variant="contained">
            Explore
          </Button>
        </Link>
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
