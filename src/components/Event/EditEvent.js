import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import eventServices from "../../services/Event";
import dayjs from "dayjs";

export default function EditEvent({ currentEvent, fetchEvent }) {
  const [open, setOpen] = useState(false);

  const [body, setBody] = useState({
    name: currentEvent.name,
    start_date: currentEvent.start_date,
    end_date: currentEvent.end_date,
    place: currentEvent.place,
    desc: currentEvent.desc,
    background_image: currentEvent.background_image,
    max_attendees: currentEvent.max_attendees,
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
    eventServices
      .modifyOneEvent(currentEvent._id, body)
      .then(() => {
        alert("Event edited");
        setOpen(false);
        fetchEvent(currentEvent._id);
      })
      .catch(() => alert("Error"));
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Modify Event
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
            value={body.name}
            fullWidth
            focused
          />
          <TextField
            id="outlined-start_date"
            label="Start date"
            type="date"
            name="start_date"
            margin="normal"
            defaultValue={dayjs(body.start_date).format("YYYY-MM-DD")}
            fullWidth
            focused
          />
          <TextField
            id="outlined-end_date"
            label="End date"
            type="date"
            name="end_date"
            margin="normal"
            defaultValue={dayjs(body.end_date).format("YYYY-MM-DD")}
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
            value={body.place}
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
            value={body.desc}
            fullWidth
            focused
          />
          <TextField
            id="outlined-max_attendees"
            label="Max Attendees"
            type="number"
            name="max_attendees"
            margin="normal"
            defaultValue={body.max_attendees}
            fullWidth
            focused
          />
          <TextField
            id="outlined-background_image"
            label="Background image URL"
            type="text"
            name="background_image"
            margin="normal"
            defaultValue={body.background_image}
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
