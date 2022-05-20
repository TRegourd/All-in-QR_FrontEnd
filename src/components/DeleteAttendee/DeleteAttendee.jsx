import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AttendeesServices from "../../services/attendees";
import React from "react";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function DeleteAttendee({
  attendeesToDelete,
  eventID,
  fetchAndSet,
}) {
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleClick = (e) => {
    e.preventDefault();

    AttendeesServices.deleteAttendee(attendeesToDelete)
      .then((response) => {
        console.log(response.data);
        fetchAndSet(eventID);
        setSnackbar({
          children: "attendee sucessfully deleted",
          severity: "success",
        });
      })
      .catch(() =>
        setSnackbar({ children: "il y a eu une erreur", severity: "error" })
      );
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClick}
        startIcon={<DeleteIcon />}
      >
        DELETE SELECTED ATTENDEES
      </Button>

      {snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
}
