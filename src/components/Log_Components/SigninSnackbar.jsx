import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import authServices from "../../services/auth";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SigninSnackbar({ body }) {
  const [open, setOpen] = React.useState(false);
  const [signed, setSigned] = React.useState(false);

  const navigate = useNavigate();

  const wait = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1500);
    });
  };

  async function handleClick() {
    authServices
      .signin(body)
      .then(() => {
        setSigned(true);
        snackBarTrue();
      })
      .catch((err) => {
        console.log(err);
        setOpen(true);
      });
  }

  async function snackBarTrue() {
    setOpen(true);
    await wait();
    navigate("/login");
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
        Sign Up
      </Button>
      {signed && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Successfully Signed in !
          </Alert>
        </Snackbar>
      )}
      {!signed && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Incorrect Entry !
          </Alert>
        </Snackbar>
      )}
    </Stack>
  );
}
