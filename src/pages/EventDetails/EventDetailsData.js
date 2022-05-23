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

import { FaUsers } from "react-icons/fa";

import afterwork from "../../assets/afterwork.jpg";
import concert from "../../assets/concert.jpg";
import conference from "../../assets/conference.jpg";

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

  function imgSrc() {
    if (
      eventData.background_image === undefined ||
      eventData.background_image === ""
    ) {
      if (eventData.type === "concert") {
        return concert;
      } else if (eventData.type === "afterwork") {
        return afterwork;
      } else if (eventData.type === "conference") {
        return conference;
      }
    } else {
      return eventData.background_image;
    }
  }

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
          <CardMedia
            component="img"
            height="500"
            image={imgSrc()}
            alt="cover img"
          />

          <Typography variant="h4" component="div">
            {eventData.name}
          </Typography>
          <Typography variant="h5" component="div">
            Event Code : {eventData.uid}
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary" variant="body5">
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
          justifyContent: "space-between",
        }}
      >
        <Card sx={{ minWidth: 275 }}>
          {eventData._id && (
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Revenue
                attendees={attendees}
                activities={activities}
                eventData={eventData}
              />
            </CardContent>
          )}
        </Card>

        <Card sx={{ minWidth: 275 }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "colum",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <FaUsers size={"30px"}></FaUsers>
            <Typography>
              <Typography variant="body2">
                <span>
                  There is currently {attendees.length} attendees registered to
                  this event
                </span>
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
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
