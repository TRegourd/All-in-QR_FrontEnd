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

export default function AddRoles({ fetchAndSet }) {
  let params = useParams();

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
    RolesServices.createRoles(body).then(() => {
      fetchAndSet(params.eventID);
      setOpen(false);
    });
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
          <Button onClick={handleSubmit}>Créer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
