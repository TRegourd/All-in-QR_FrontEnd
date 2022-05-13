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

export default function EventCard({ event, fetchAndSetEvents }) {
  function deleteEvent(e) {
    e.preventDefault();
    let confirmed = window.confirm(
      "Etes-vous sûr de vous supprimer l'évènement? Les données des participants et activitées seront supprimées."
    );
    if (confirmed === true) {
      eventServices
        .deleteOneEvent(event._id)
        .then(fetchAndSetEvents())
        .catch((err) => console.log(err));
    } else {
      alert("Suppression annulée.");
    }
  }

  function imgSrc() {
    if (event.type === "concert") {
      return concert;
    } else if (event.type === "afterwork") {
      return afterwork;
    } else if (event.type === "conference") {
      return conference;
    }
  }

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={imgSrc()}
          alt="cover img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {event.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <p>{event.place}</p>
            <br />
            <p>Du {dayjs(event.start_date).format("DD-MM-YY")}</p>
            <p>Au {dayjs(event.end_date).format("DD-MM-YY")}</p>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={deleteEvent} size="small" color="primary">
          <BiTrash />
          Delete Event
        </Button>
      </CardActions>
    </Card>
  );
}