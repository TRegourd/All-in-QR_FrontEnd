import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AttendeesServices from "../../services/attendees";
import React from "react";

export default function DeleteAttendee({
  result,
  eventID,
  fetchAndSetAttendees,
}) {
  const handleClick = () => {
    AttendeesServices.deleteAttendee(result._id)
      .then((response) => {
        console.log(response.data);
        fetchAndSetAttendees(eventID);
      })
      .catch(() => alert("erreur"));
  };

  console.log(eventID);

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
