import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Item } from "../../components/Profile_Components/Item";
import EditEvent from "../../components/Event/EditEvent";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function EventDetailsData({
  eventData,
  attendees,
  fetchAndSetOneEvent,
}) {
  console.log(eventData);
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <Typography variant="h4" color="text.secondary" gutterBottom>
          {eventData.type}
        </Typography>
        <Typography variant="h2" component="div">
          {eventData.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" variant="h5">
          {eventData.desc}
        </Typography>
        <Typography variant="body1">
          {eventData.place}
          <br /> From {dayjs(eventData.start_date).format("DD-MM")} to{" "}
          {dayjs(eventData.end_date).format("DD-MM")}
        </Typography>
        <Typography variant="body1"></Typography>
        <Typography variant="body2">
          There is currently {attendees.length} attendees registered to this
          event
        </Typography>
      </CardContent>
      <CardActions>
        {eventData._id && (
          <EditEvent
            fetchEvent={fetchAndSetOneEvent}
            currentEvent={eventData}
          ></EditEvent>
        )}
      </CardActions>
    </Card>
  );
}
