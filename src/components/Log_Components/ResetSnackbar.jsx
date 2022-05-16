import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import authServices from "../../services/auth";
import { useNavigate, useParams } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ResetSnackbar({ body }) {
  const [open, setOpen] = React.useState(false);
  const [signed, setSigned] = React.useState(false);

  const navigate = useNavigate();
  const props = useParams();

  console.log(body);

  const wait = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1500);
    });
  };

  async function handleClick() {
    const id = props.id;
    authServices
      .reset(body, id)
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
        Reset Password
      </Button>
      {signed && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Password successfully reset !
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
