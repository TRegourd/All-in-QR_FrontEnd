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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useParams } from "react-router-dom";
import ActivitiesServices from "../../services/activities";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function AddACtivities({ fetchAndSet, roles }) {
  let params = useParams();

  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const [open, setOpen] = useState(false);

  const allRole = roles;
  const [selectedRole, setSelectedRole] = useState("");
  const [date, setDate] = React.useState(dayjs());
  const [body, setBody] = useState({
    name: "",
    date: dayjs(),
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
    ActivitiesServices.createActivities(body)
      .then((result) => {
        fetchAndSet(params.eventID);
        setOpen(false);
        setSnackbar({
          children: "activity sucessfully added",
          severity: "success",
        });
      })
      .catch(() =>
        setSnackbar({ children: "il y a eu une erreur", severity: "error" })
      );
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
        CREATE ACTIVITY
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        onChange={handleBodyChange}
        sx={{
          "& .MuiTextField-root": { m: 1, width: 250 },
        }}
      >
        <DialogTitle>Create Activity</DialogTitle>
        <DialogContent>
          <div>
            <FormControl sx={{ m: 1, width: "100%" }}>
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
                  inputFormat="DD-MM-YYYY HH:mm"
                />
              </LocalizationProvider>
            </div>
            <div>
              <TextField
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
                id="outlined-desc"
                label="Description"
                name="desc"
                variant="outlined"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="outlined">
            Create
          </Button>
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
