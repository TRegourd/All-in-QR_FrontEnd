import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import authServices from "../../services/auth";
import { useNavigate } from "react-router-dom";
import AttendeesServices from "../../services/attendees";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SendRegisterEmailSnackbar({ body, handleCloseForm }) {
  const [open, setOpen] = React.useState(false);
  const [signed, setSigned] = React.useState(false);

  async function handleClick() {
    if (body.roleId && body.email && body.eventId) {
      AttendeesServices.sendRegisterEmail(body)
        .then(() => {
          setSigned(true);
          snackBarTrue();
          handleCloseForm();
        })
        .catch((err) => {
          console.log(err);
          setOpen(true);
        });
    } else {
      setOpen(true);
    }
  }

  async function snackBarTrue() {
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Stack>
      <Button variant="outlined" onClick={handleClick}>
        Send Register Email
      </Button>
      {signed && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Email Successfully Sent!
          </Alert>
        </Snackbar>
      )}
      {!signed && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Incorrect Entry !
          </Alert>
        </Snackbar>
      )}
    </Stack>
  );
}
