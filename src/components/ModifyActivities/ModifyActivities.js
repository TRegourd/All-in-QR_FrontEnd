import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import React, { useState } from "react";
import ActivitiesServices from "../../services/activities";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function ModifyActivities({
  result,
  eventID,
  fetchAndSet,
  roles,
}) {
  const [open, setOpen] = useState(false);

  const allRole = roles;
  const [selectedRole, setSelectedRole] = useState(
    result.role !== null ? result.role._id : ""
  );
  const [date, setDate] = React.useState(result.date);
  const [body, setBody] = useState({
    name: result.name,
    date: result.date,
    duration: result.duration,
    price: result.price,
    desc: result.desc,
    role: result.role !== null ? result.role._id : "",
    event: eventID,
  });

  const handleDateChange = (event) => {
    setDate(event.$d);
    updateBody("date", event.$d);
  };

  const handleSubmit = (e) => {
    ActivitiesServices.modifyActivities(result._id, body)
      .then((result) => {
        fetchAndSet(eventID);
        setOpen(false);
      })
      .catch(() => alert("erreur"));
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    handleBodyChange(event);
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
        <DialogTitle>Modifier l'activité</DialogTitle>
        <DialogContent>
          <div>
            <div>
              <TextField
                required
                id="outlined-name"
                label="Name"
                name="name"
                variant="outlined"
                value={body.name}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="date"
                  name="date"
                  value={date}
                  onChange={handleDateChange}
                />
              </LocalizationProvider>
            </div>
            <div>
              <TextField
                required
                id="outlined-duration"
                label="Duration"
                name="duration"
                variant="outlined"
                value={body.duration}
              />
              <TextField
                required
                id="outlined-price"
                label="Price"
                name="price"
                variant="outlined"
                value={body.price}
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-desc"
                label="Description"
                name="desc"
                variant="outlined"
                value={body.desc}
              />

              <FormControl sx={{ m: 1, width: "100%", maxWidth: 250 }}>
                <InputLabel id="select-role-label">Role</InputLabel>
                <Select
                  labelId="select-role-label"
                  id="select-role"
                  value={selectedRole}
                  label="Role"
                  onChange={handleRoleChange}
                  name="role"
                >
                  {allRole.map((value) => {
                    return (
                      <MenuItem key={value._id} value={value._id}>
                        {value.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Modifier</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
