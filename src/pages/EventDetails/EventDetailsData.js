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
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Revenue from "../../components/revenue/Revenue";
import CardMedia from "@mui/material/CardMedia";

export default function EventDetailsData({
  eventData,
  attendees,
  fetchAndSetOneEvent,
  activities,
}) {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));

  const normalise = (attendees.length * 100) / eventData.max_attendees;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
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
          <Typography variant="h4" component="div">
            Code évènement : {eventData.uid}
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

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          justifyContent: "space-evenly",
        }}
      >
        <Card sx={{ minWidth: 275 }}>
          {eventData._id && (
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Revenue attendees={attendees} activities={activities} />
            </CardContent>
          )}
        </Card>

        <Card sx={{ minWidth: 275 }}>
          <CardContent sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="body2">
              There is currently {attendees.length} attendees registered to this
              event
            </Typography>
            <Box width={300}>
              <BorderLinearProgress variant="determinate" value={normalise} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography>
                {`[${Math.round(normalise)}%]`} Max attendees :{" "}
                {eventData.max_attendees}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
