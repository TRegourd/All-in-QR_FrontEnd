import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import RolesServices from "../../services/roles";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function AddRoles({ fetchAndSet }) {
  let params = useParams();

  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const [open, setOpen] = useState(false);

  const [body, setBody] = useState({
    name: "",
    event: params.eventID,
  });

  const updateBody = (key, value) => {
    setBody({ ...body, [key]: value });
  };

  const handleBodyChange = (event) => {
    const { name, value } = event.target;
    updateBody(name, value);
  };

  const handleSubmit = (e) => {
    RolesServices.createRoles(body)
      .then(() => {
        fetchAndSet(params.eventID);
        setOpen(false);
        setSnackbar({
          children: "role sucessfully added",
          severity: "success",
        });
      })
      .catch(() =>
        setSnackbar({ children: "il y a eu une erreur", severity: "error" })
      );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        créer un role
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        onChange={handleBodyChange}
        sx={{
          "& .MuiTextField-root": { m: 1, width: 250 },
        }}
      >
        <DialogTitle>créer le role</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              id="outlined-role"
              label="role"
              variant="outlined"
              name="name"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Envoyer</Button>
        </DialogActions>
      </Dialog>

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
