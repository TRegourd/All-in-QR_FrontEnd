import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import eventServices from "../../services/Event";

export default function EditEvent({ currentEvent }) {
  const [open, setOpen] = useState(false);

  const [body, setBody] = useState({
    name: currentEvent.name,
    start_date: currentEvent.startDate,
    end_date: currentEvent.endDate,
    place: currentEvent.place,
    desc: currentEvent.desc,
  });

  function updateEvent(key, value) {
    setBody({ ...body, [key]: value });
  }

  function handleChangeInput(e) {
    const { name, value } = e.target;
    updateEvent(name, value);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log(body);
    eventServices
      .modifyOneEvent(currentEvent._id, body)
      .then(() => {
        alert("Event edited");
        setOpen(false);
      })
      .catch(() => alert("Error"));
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Modifier
      </Button>
      <Dialog open={open} onClose={handleClose} onChange={handleChangeInput}>
        <DialogTitle>Edit My Event</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-event_name-required"
            label="Event Name"
            placeholder="Event Name"
            name="name"
            margin="normal"
            fullWidth
            focused
          />
          <TextField
            id="outlined-start_date"
            label="Start date"
            type="date"
            name="start_date"
            margin="normal"
            fullWidth
            focused
          />
          <TextField
            id="outlined-end_date"
            label="End date"
            type="date"
            name="end_date"
            margin="normal"
            fullWidth
            focused
          />
          <TextField
            id="outlined-place"
            label="Place"
            type="text"
            name="place"
            placeholder="Place"
            margin="normal"
            fullWidth
            focused
          />
          <TextField
            id="outlined-textarea"
            label="Description"
            type="text"
            name="desc"
            placeholder="Description"
            margin="normal"
            fullWidth
            focused
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
