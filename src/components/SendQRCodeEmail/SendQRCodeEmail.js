import { Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import AttendeesServices from "../../services/attendees";
import React from "react";

export default function SendQRCode({ result }) {
  const handleClick = () => {
    AttendeesServices.sendQrCodeEmail(result._id)
      .then((response) => {
        alert("Email envoyé");
      })
      .catch(() => alert("erreur"));
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClick}
        startIcon={<EmailIcon />}
      >
        Envoyer QR Code
      </Button>
    </div>
  );
}
