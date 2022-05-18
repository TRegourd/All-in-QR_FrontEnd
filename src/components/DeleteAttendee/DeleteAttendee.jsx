import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AttendeesServices from "../../services/attendees";
import React from "react";

export default function DeleteAttendee({
  attendeesToDelete,
  eventID,
  fetchAndSet,
}) {
  const handleClick = (e) => {
    e.preventDefault();

    AttendeesServices.deleteAttendee(attendeesToDelete)
      .then((response) => {
        console.log(response.data);
        fetchAndSet(eventID);
      })
      .catch(() => alert("erreur"));
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClick}
        startIcon={<DeleteIcon />}
      >
        Supprimer
      </Button>
    </div>
  );
}
