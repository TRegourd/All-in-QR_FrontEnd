import { Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import AttendeesServices from "../../services/attendees";
import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function SendQRCodeToAll({ attendeesQR }) {
  const params = useParams();

  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleClick = () => {
    AttendeesServices.sendQrCodeEmailToEveryone(attendeesQR)
      .then((response) => {
        setSnackbar({
          children: "QR code sent to all",
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
        startIcon={<EmailIcon />}
      >
        Envoyer le QR Code aux utilisateurs sélectionnés.
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
