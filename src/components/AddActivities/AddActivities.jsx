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
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { useParams } from "react-router-dom";
import ActivitiesServices from "../../services/activities";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function AddACtivities({ fetchAndSet, roles }) {
  let params = useParams();

  const [open, setOpen] = useState(false);

  const allRole = roles;
  const [selectedRole, setSelectedRole] = useState("");
  const [date, setDate] = React.useState(dayjs().format("LLL"));
  const [body, setBody] = useState({
    name: "",
    date: dayjs().format("LLL"),
    duration: null,
    price: null,
    desc: "",
    role: "",
    event: params.eventID,
  });

  const handleDateChange = (event) => {
    setDate(event.$d);
    updateBody("date", event.$d);
  };

  const handleSubmit = (e) => {
    ActivitiesServices.createActivities(body).then((result) => {
      fetchAndSet(params.eventID);
      setOpen(false);
    });
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
        créer une activité
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        onChange={handleBodyChange}
        sx={{
          "& .MuiTextField-root": { m: 1, width: 250 },
        }}
      >
        <DialogTitle>créer une activité</DialogTitle>
        <DialogContent>
          <div>
            <div>
              <TextField
                required
                id="outlined-name"
                label="Name"
                name="name"
                variant="outlined"
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
              />
              <TextField
                required
                id="outlined-price"
                label="Price"
                name="price"
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-desc"
                label="Description"
                name="desc"
                variant="outlined"
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
          <Button onClick={handleSubmit}>Envoyer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
