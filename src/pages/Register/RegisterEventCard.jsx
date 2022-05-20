import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { BiTrash } from "react-icons/bi";
import eventServices from "../../services/Event";
import afterwork from "../../assets/afterwork.jpg";
import concert from "../../assets/concert.jpg";
import conference from "../../assets/conference.jpg";
import dayjs from "dayjs";

export default function RegisterEventCard({ event }) {
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
    <Card sx={{ maxWidth: "300" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="500"
          image={imgSrc()}
          alt="cover img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {event.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span>{event.place}</span>
            <br />
            <span>Du {dayjs(event.start_date).format("DD-MM-YY")}</span>
            <br />
            <span>Au {dayjs(event.end_date).format("DD-MM-YY")}</span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span>{event.desc}</span>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions></CardActions>
    </Card>
  );
}
