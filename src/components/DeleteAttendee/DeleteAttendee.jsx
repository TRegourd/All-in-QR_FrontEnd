import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AttendeesServices from "../../services/attendees";
import React from "react";

export default function DeleteAttendee({ attendeesToDelete }) {
  const handleClick = (e) => {
    e.preventDefault();
    console.log("toto", attendeesToDelete);
    AttendeesServices.deleteAttendee(attendeesToDelete)
      .then((response) => {
        console.log(response.data);
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
