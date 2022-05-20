import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { MdPlace } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import afterwork from "../../../assets/afterwork.jpg";
import concert from "../../../assets/concert.jpg";
import conference from "../../../assets/conference.jpg";
import dayjs from "dayjs";

import "./CarouselEventCard.css";

export default function CarouselEventCard({ event }) {
  function imgSrc() {
    if (event.background_image === undefined || event.background_image === "") {
      if (event.type === "concert") {
        return concert;
      } else if (event.type === "afterwork") {
        return afterwork;
      } else if (event.type === "conference") {
        return conference;
      }
    } else {
      return event.background_image;
    }
  }

  return (
    <Card className="cardContainer">
      <CardActionArea>
        <CardMedia
          className="cardImageContainer"
          component="img"
          image={imgSrc()}
          alt="cover img"
        />
        <CardContent className="cardContentContainer">
          <Typography gutterBottom variant="body1" component="div">
            {event.name}
          </Typography>
          <div className="cardDescContainer">
            <Typography variant="body3">
              <b>
                <MdPlace />
                {event.place}
              </b>
            </Typography>
            <Typography variant="body3">
              <FaCalendarAlt />
              <span>{dayjs(event.start_date).format("DD-MM-YY")}</span>
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
