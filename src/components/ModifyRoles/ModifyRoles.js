import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import React, { useState } from "react";
import RolesServices from "../../services/roles";

export default function ModifyRoles({ result, eventID, fetchAndSetRoles }) {
  const [open, setOpen] = useState(false);

  const [body, setBody] = useState({
    name: result.name,
    event: eventID,
  });

  const handleSubmit = (e) => {
    RolesServices.modifyRoles(result._id, body)
      .then((result) => {
        fetchAndSetRoles(eventID);
        setOpen(false);
      })
      .catch(() => alert("erreur"));
  };

  const updateBody = (key, value) => {
    setBody({ ...body, [key]: value });
  };

  const handleBodyChange = (event) => {
    const { name, value } = event.target;
    updateBody(name, value);
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
        Modifier l'activité
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        onChange={handleBodyChange}
        sx={{
          "& .MuiTextField-root": { m: 1, width: 250 },
        }}
      >
        <DialogTitle>Modifier le role</DialogTitle>
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
    </div>
  );
}
