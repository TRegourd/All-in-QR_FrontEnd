import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import authServices from "../../services/auth";
import { BsPlusLg } from "react-icons/bs";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function NewEvent({ fetchAndSetEvents, currentUser }) {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState("concert");

  const [form, setForm] = React.useState({
    name: "",
    start_date: "",
    end_date: "",
    place: "",
    desc: "",
    type: "concert",
    admin: currentUser._id,
  });

  function handleChangeSelect(e) {
    setType(e.target.value);
    setForm({ ...form, ["type"]: e.target.value });
  }

  function updateForm(key, value) {
    setForm({ ...form, [key]: value });
  }

  function handleChangeInput(e) {
    const { name, value } = e.target;
    updateForm(name, value);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleSubmit(e) {
    e.preventDefault();
    authServices
      .createEvent(form)
      .then(() => {
        fetchAndSetEvents();
        alert("Event created");
      })
      .catch((err) => {
        console.log(err);
        alert("Can't create event");
      });
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <BsPlusLg style={{ marginRight: "10" }} />
        Add New Event
      </Button>
      <Dialog open={open} onClose={handleClose} onChange={handleChangeInput}>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            <pre>{JSON.stringify(form, null, 2)}</pre>
          </DialogContentText> */}

          <TextField
            label="Event Name"
            placeholder="Event Name"
            name="name"
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            label="Start date"
            type="date"
            name="start_date"
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="End date"
            type="date"
            name="end_date"
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Place"
            type="text"
            name="place"
            placeholder="Place"
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
            required
          />
          <TextField
            label="Description"
            type="text"
            name="desc"
            placeholder="Description"
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
            required
          />
          <FormControl margin="dense" autoFocus fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="type"
              value={type}
              onChange={handleChangeSelect}
              placeholder="Type"
              name="type"
              required
            >
              <MenuItem value={"afterwork"}>Afterwork</MenuItem>
              <MenuItem value={"concert"}>Concert</MenuItem>
              <MenuItem value={"conference"}>Conference</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
