import { Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import AttendeesServices from "../../services/attendees";
import React from "react";
import { useParams } from "react-router-dom";

export default function SendQRCodeToAll({ attendeesQR }) {
  const params = useParams();

  const handleClick = () => {
    AttendeesServices.sendQrCodeEmailToEveryone(attendeesQR)
      .then((response) => {
        alert("Emails envoyé");
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
        Envoyer le QR Code à tous.
      </Button>
    </div>
  );
}
